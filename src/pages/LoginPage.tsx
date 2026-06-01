import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard } from 'lucide-react'
import { DEMO_EMAIL, DEMO_PASSWORD } from '@/api/mockData'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuthStore } from '@/store/authStore'

const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginForm = z.infer<typeof loginSchema>

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useAuthStore((s) => s.user)
  const login = useAuthStore((s) => s.login)
  const isLoading = useAuthStore((s) => s.isLoading)
  const error = useAuthStore((s) => s.error)
  const clearError = useAuthStore((s) => s.clearError)

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/dashboard'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: DEMO_EMAIL, password: DEMO_PASSWORD },
  })

  useEffect(() => {
    if (user) navigate(from, { replace: true })
  }, [user, navigate, from])

  const onSubmit = async (data: LoginForm) => {
    clearError()
    const ok = await login(data.email, data.password)
    if (ok) navigate(from, { replace: true })
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden flex-1 flex-col justify-between bg-slate-900 p-12 text-white lg:flex">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-indigo-600">
            <LayoutDashboard className="size-6" />
          </span>
          <span className="text-xl font-bold">AdminPanel</span>
        </div>
        <div>
          <h1 className="text-4xl font-bold leading-tight">Manage your business in one place</h1>
          <p className="mt-4 max-w-md text-slate-400">
            A modern React admin dashboard built for portfolio and freelance showcases — charts,
            tables, auth, and dark mode included.
          </p>
        </div>
        <p className="text-sm text-slate-500">© 2026 · Portfolio project</p>
      </div>

      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <span className="flex size-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <LayoutDashboard className="size-6" />
            </span>
            <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-slate-100">Sign in</h2>
          </div>

          <div className="hidden lg:block">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Sign in</h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">Use demo credentials below</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
            <Input
              label="Email"
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              label="Password"
              type="password"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register('password')}
            />

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-300">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              Sign in
            </Button>
          </form>

          <div className="mt-6 rounded-lg border border-dashed border-slate-200 bg-slate-50 p-4 text-sm dark:border-slate-700 dark:bg-slate-900/50">
            <p className="font-medium text-slate-700 dark:text-slate-300">Demo credentials</p>
            <p className="mt-1 text-slate-500 dark:text-slate-400">
              Email: <code className="text-indigo-600 dark:text-indigo-400">{DEMO_EMAIL}</code>
            </p>
            <p className="text-slate-500 dark:text-slate-400">
              Password: <code className="text-indigo-600 dark:text-indigo-400">{DEMO_PASSWORD}</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
