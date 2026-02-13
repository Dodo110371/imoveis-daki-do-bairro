'use client'

import { useState } from 'react'
import { deleteUser } from './actions'
import { Trash2, Shield, User as UserIcon, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function UserList({ initialUsers }: { initialUsers: any[] }) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const handleDelete = async (userId: string) => {
    if (!confirm('Tem certeza? Isso excluirá o usuário e TODOS os seus imóveis permanentemente.')) return

    setIsDeleting(userId)
    try {
      const result = await deleteUser(userId)
      if (!result.success) {
        alert('Erro ao excluir: ' + result.error)
      }
    } catch (error) {
      alert('Erro inesperado')
    } finally {
      setIsDeleting(null)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-700">Usuário</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Role</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Cadastro</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {initialUsers.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                      <UserIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">{user.full_name || 'Sem nome'}</div>
                      <div className="text-slate-500 text-xs font-mono">{user.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {user.role === 'admin' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      <Shield className="w-3 h-3" />
                      Admin
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                      Usuário
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    {user.created_at ? format(new Date(user.created_at), "dd 'de' MMM, yyyy", { locale: ptBR }) : '-'}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(user.id)}
                    disabled={isDeleting === user.id || user.role === 'admin'}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Excluir Usuário"
                  >
                    {isDeleting === user.id ? (
                      <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                  </button>
                </td>
              </tr>
            ))}
            {initialUsers.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                  Nenhum usuário encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
