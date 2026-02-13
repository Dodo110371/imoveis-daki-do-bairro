'use server'

import { createClient } from '@supabase/supabase-js'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getUsers() {
  const supabase = await createServerClient()
  
  // Verifica se é admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
    
  if (profile?.role !== 'admin') throw new Error('Forbidden')

  // Lista usuários da tabela profiles
  // Note: auth.users não é acessível via client normal. Usamos profiles.
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return profiles
}

export async function deleteUser(userId: string) {
  const supabase = await createServerClient()
  
  // Verifica se é admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
    
  if (profile?.role !== 'admin') throw new Error('Forbidden')

  try {
    // Tenta usar Service Role Key para deletar do Auth
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false
          }
        }
      )

      // 1. Deletar arquivos do Storage
      // Listar arquivos no bucket 'properties' com prefixo user_id
      const { data: files } = await supabaseAdmin
        .storage
        .from('properties')
        .list(userId)

      if (files && files.length > 0) {
        const paths = files.map(f => `${userId}/${f.name}`)
        await supabaseAdmin.storage.from('properties').remove(paths)
      }
      
      // Também verificar se existem imagens soltas ou em outras pastas se necessário
      // Mas o padrão é user_id/filename

      // 2. Deletar usuário do Auth (Cascade deve cuidar do resto)
      const { error } = await supabaseAdmin.auth.admin.deleteUser(userId)
      if (error) throw error
    } else {
      // Fallback: Se não tiver service key, tenta chamar a RPC
      // Isso requer que o usuário tenha rodado o script SQL
      const { error: rpcError } = await supabase.rpc('delete_user_by_admin', { target_user_id: userId })
      if (rpcError) throw rpcError
    }

    revalidatePath('/admin/usuarios')
    return { success: true }
  } catch (error: any) {
    console.error('Error deleting user:', error)
    return { success: false, error: error.message }
  }
}
