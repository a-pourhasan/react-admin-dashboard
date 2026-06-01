import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuthStore } from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'

const profileSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
})

type ProfileForm = z.infer<typeof profileSchema>

export function SettingsPage() {
  const user = useAuthStore((s) => s.user)
  const { theme, setTheme } = useThemeStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
    },
  })

  const onSubmit = (_data: ProfileForm) => {
    // Simulated save for demo
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Settings</h1>
        <p className="text-slate-500 dark:text-slate-400">Manage your account and preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input label="Full name" error={errors.name?.message} {...register('name')} />
            <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
            <Button type="submit">Save changes</Button>
            {isSubmitSuccessful && (
              <p className="text-sm text-emerald-600 dark:text-emerald-400">Profile saved (demo).</p>
            )}
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">Choose your preferred theme</p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`flex-1 rounded-lg border-2 px-4 py-3 text-sm font-medium transition-colors ${
                theme === 'light'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              Light
            </button>
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`flex-1 rounded-lg border-2 px-4 py-3 text-sm font-medium transition-colors ${
                theme === 'dark'
                  ? 'border-indigo-600 bg-indigo-950 text-indigo-300'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              Dark
            </button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { id: 'email', label: 'Email notifications', desc: 'Receive order updates via email' },
            { id: 'push', label: 'Push notifications', desc: 'Browser alerts for new orders' },
            { id: 'weekly', label: 'Weekly report', desc: 'Summary every Monday morning' },
          ].map((item) => (
            <label
              key={item.id}
              className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-slate-100 p-4 dark:border-slate-800"
            >
              <div>
                <p className="font-medium text-slate-900 dark:text-slate-100">{item.label}</p>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
              <input
                type="checkbox"
                defaultChecked={item.id !== 'push'}
                className="size-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
            </label>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
