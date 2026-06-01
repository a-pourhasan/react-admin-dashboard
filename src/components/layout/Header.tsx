import { LogOut, Menu, Moon, Sun, Bell } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'
import { Button } from '../ui/Button'

interface HeaderProps {
  onMenuClick: () => void
  sidebarCollapsed: boolean
}

export function Header({ onMenuClick, sidebarCollapsed }: HeaderProps) {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const { theme, toggleTheme } = useThemeStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </button>
        <div className="hidden sm:block">
          <p className="text-sm text-slate-500 dark:text-slate-400">Welcome back</p>
          <p className="font-semibold text-slate-900 dark:text-slate-100">{user?.name ?? 'Admin'}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Notifications"
        >
          <Bell className="size-5" />
          <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-red-500" />
        </button>
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon className="size-5" /> : <Sun className="size-5" />}
        </button>
        <div className="mx-2 hidden h-8 w-px bg-slate-200 sm:block dark:bg-slate-700" />
        <div className="hidden items-center gap-3 sm:flex">
          <div className="flex size-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
            {user?.name?.charAt(0) ?? 'A'}
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout} className="hidden sm:inline-flex">
          <LogOut className="size-4" />
          Logout
        </Button>
      </div>
      <span className="sr-only">{sidebarCollapsed ? 'Sidebar collapsed' : 'Sidebar expanded'}</span>
    </header>
  )
}
