import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent } from './ui/Card'

interface StatCardProps {
  title: string
  value: string
  change: number
  icon: LucideIcon
  iconClassName?: string
}

export function StatCard({ title, value, change, icon: Icon, iconClassName }: StatCardProps) {
  const isPositive = change >= 0
  return (
    <Card>
      <CardContent className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
          <p
            className={cn(
              'mt-1 text-sm font-medium',
              isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400',
            )}
          >
            {isPositive ? '+' : ''}
            {change}% vs last month
          </p>
        </div>
        <div
          className={cn(
            'flex size-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400',
            iconClassName,
          )}
        >
          <Icon className="size-6" />
        </div>
      </CardContent>
    </Card>
  )
}
