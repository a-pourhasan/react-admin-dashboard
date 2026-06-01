import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />

      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-20 bg-slate-900/50 lg:hidden"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div
        className={cn(
          'flex min-h-screen flex-col transition-all duration-300',
          collapsed ? 'lg:pl-[72px]' : 'lg:pl-64',
        )}
      >
        <Header
          onMenuClick={() => setMobileOpen(true)}
          sidebarCollapsed={collapsed}
        />
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>

      <div
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 transition-transform lg:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <Sidebar collapsed={false} onToggle={() => setMobileOpen(false)} />
      </div>
    </div>
  )
}
