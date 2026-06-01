import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Search, Trash2 } from 'lucide-react'
import { fetchUsers } from '@/api/client'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Modal, ModalActions } from '@/components/ui/Modal'
import { Pagination } from '@/components/ui/Pagination'
import { Spinner } from '@/components/ui/Spinner'
import { formatDate } from '@/lib/utils'
import type { User, UserRole, UserStatus } from '@/types'

const PAGE_SIZE = 6

const roleVariant: Record<UserRole, 'info' | 'default' | 'warning'> = {
  admin: 'info',
  editor: 'default',
  viewer: 'warning',
}

const statusVariant: Record<UserStatus, 'success' | 'warning' | 'danger'> = {
  active: 'success',
  pending: 'warning',
  inactive: 'danger',
}

export function UsersPage() {
  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set())

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return users.filter(
      (u) =>
        !hiddenIds.has(u.id) &&
        (!q ||
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.role.includes(q)),
    )
  }, [users, search, hiddenIds])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const userToDelete = users.find((u) => u.id === deleteId)

  const confirmDelete = () => {
    if (deleteId) {
      setHiddenIds((prev) => new Set(prev).add(deleteId))
      setDeleteId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Users</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage team members and permissions</p>
        </div>
        <Button className="shrink-0">+ Add User</Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>All Users ({filtered.length})</CardTitle>
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search users..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900"
            />
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          {isLoading ? (
            <Spinner />
          ) : isError ? (
            <p className="p-6 text-red-600">Failed to load users.</p>
          ) : (
            <>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-500 dark:border-slate-800">
                    <th className="px-6 py-3 font-medium">User</th>
                    <th className="px-6 py-3 font-medium">Role</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium">Joined</th>
                    <th className="px-6 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((user: User) => (
                    <tr
                      key={user.id}
                      className="border-b border-slate-50 last:border-0 dark:border-slate-800/50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex size-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                            {user.avatar}
                          </span>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-slate-100">{user.name}</p>
                            <p className="text-xs text-slate-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={roleVariant[user.role]}>{user.role}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={statusVariant[user.status]}>{user.status}</Badge>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{formatDate(user.joinedAt)}</td>
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() => setDeleteId(user.id)}
                          className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
                          aria-label={`Delete ${user.name}`}
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            </>
          )}
        </CardContent>
      </Card>

      <Modal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Delete user"
        footer={
          <ModalActions
            onCancel={() => setDeleteId(null)}
            onConfirm={confirmDelete}
            confirmLabel="Delete"
          />
        }
      >
        <p className="text-slate-600 dark:text-slate-400">
          Are you sure you want to remove <strong>{userToDelete?.name}</strong>? This action is
          simulated for the demo.
        </p>
      </Modal>
    </div>
  )
}
