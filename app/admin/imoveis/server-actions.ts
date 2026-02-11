'use server';

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updatePropertyStatus(propertyId: string, status: 'active' | 'rejected') {
  const supabase = await createClient();
  
  // Verify admin again (security depth)
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (profile?.role !== 'admin') throw new Error("Unauthorized");

  // If rejected, set to 'inactive'
  const finalStatus = status === 'active' ? 'active' : 'inactive';

  const { error } = await supabase
    .from('properties')
    .update({ status: finalStatus })
    .eq('id', propertyId);

  if (error) throw error;

  revalidatePath('/admin/imoveis');
  revalidatePath('/admin');
}