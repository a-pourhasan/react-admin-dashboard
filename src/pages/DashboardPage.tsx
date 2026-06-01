import { useQuery } from '@tanstack/react-query'
import { DollarSign, Package, ShoppingCart, Users } from 'lucide-react'
import {
  fetchCategorySales,
  fetchDashboardStats,
  fetchRecentOrders,
  fetchRevenueChart,
} from '@/api/client'
import { CategoryChart } from '@/components/charts/CategoryChart'
import { RevenueChart } from '@/components/charts/RevenueChart'
import { StatCard } from '@/components/StatCard'
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

export function DashboardPage() {
  const statsQuery = useQuery({ queryKey: ['dashboard-stats'], queryFn: fetchDashboardStats })
  const revenueQuery = useQuery({ queryKey: ['revenue-chart'], queryFn: fetchRevenueChart })
  const categoryQuery = useQuery({ queryKey: ['category-sales'], queryFn: fetchCategorySales })
  const ordersQuery = useQuery({ queryKey: ['recent-orders'], queryFn: fetchRecentOrders })

  const stats = statsQuery.data

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400">Overview of your store performance</p>
      </div>

      {statsQuery.isLoading ? (
        <Spinner />
      ) : stats ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Revenue"
            value={formatCurrency(stats.revenue)}
            change={stats.revenueChange}
            icon={DollarSign}
          />
          <StatCard
            title="Orders"
            value={stats.orders.toLocaleString()}
            change={stats.ordersChange}
            icon={ShoppingCart}
          />
          <StatCard
            title="Customers"
            value={stats.customers.toLocaleString()}
            change={stats.customersChange}
            icon={Users}
          />
          <StatCard
            title="Products"
            value={String(stats.products)}
            change={stats.productsChange}
            icon={Package}
          />
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            {revenueQuery.isLoading ? <Spinner /> : revenueQuery.data && <RevenueChart data={revenueQuery.data} />}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            {categoryQuery.isLoading ? (
              <Spinner />
            ) : (
              categoryQuery.data && <CategoryChart data={categoryQuery.data} />
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          {ordersQuery.isLoading ? (
            <Spinner />
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  <th className="px-6 py-3 font-medium">Order</th>
                  <th className="px-6 py-3 font-medium">Customer</th>
                  <th className="px-6 py-3 font-medium">Total</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {ordersQuery.data?.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-slate-50 last:border-0 dark:border-slate-800/50"
                  >
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">
                      {order.id}
                    </td>
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
