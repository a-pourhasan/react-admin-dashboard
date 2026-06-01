import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { loginRequest } from '@/api/client'
import type { AuthUser } from '@/types'

interface AuthState {
  user: AuthUser | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
          const user = await loginRequest(email, password)
          if (!user) {
            set({ isLoading: false, error: 'Invalid email or password' })
            return false
          }
          set({ user, isLoading: false, error: null })
          return true
        } catch {
          set({ isLoading: false, error: 'Something went wrong. Please try again.' })
          return false
        }
      },
      logout: () => set({ user: null, error: null }),
      clearError: () => set({ error: null }),
    }),
    { name: 'admin-auth' },
  ),
)
