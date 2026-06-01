import { useQuery } from '@tanstack/react-query'
import { fetchRecentOrders } from '@/api/client'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Spinner } from '@/components/ui/Spinner'
import { formatCurrency, formatDate } from '@/lib/utils'
import type { OrderStatus } from '@/types'

const orderBadge: Record<OrderStatus, 'success' | 'warning' | 'danger' | 'info'> = {
  completed: 'success',
  processing: 'warning',
  cancelled: 'danger',
  shipped: 'info',
}

export function OrdersPage() {
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchRecentOrders,
  })

  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Orders</h1>
        <p className="text-slate-500 dark:text-slate-400">
          {orders.length} orders · {formatCurrency(totalRevenue)} total (excl. cancelled)
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          {isLoading ? (
            <Spinner />
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-slate-500 dark:border-slate-800">
                  <th className="px-6 py-3 font-medium">Order ID</th>
                  <th className="px-6 py-3 font-medium">Customer</th>
                  <th className="px-6 py-3 font-medium">Total</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-slate-50 last:border-0 dark:border-slate-800/50"
                  >
                    <td className="px-6 py-4 font-medium">{order.id}</td>
                    <td className="px-6 py-4">
                      <div>{order.customer}</div>
                      <div className="text-xs text-slate-500">{order.email}</div>
                    </td>
                    <td className="px-6 py-4">{formatCurrency(order.total)}</td>
                    <td className="px-6 py-4">
                      <Badge variant={orderBadge[order.status]}>{order.status}</Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{formatDate(order.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
