import { getUsers } from './actions'
import { UserList } from './user-list'
import { Users } from 'lucide-react'

export default async function AdminUsersPage() {
  const users = await getUsers()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <Users className="w-8 h-8 text-blue-600" />
          Gerenciar Usuários
        </h1>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium">
          Total: {users.length}
        </div>
      </div>

      <UserList initialUsers={users} />
    </div>
  )
}
