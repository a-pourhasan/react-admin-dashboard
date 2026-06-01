import { delay } from '@/lib/utils'
import type { AuthUser, CategorySale, DashboardStats, Order, Product, RevenuePoint, User } from '@/types'
import {
  categorySales,
  dashboardStats,
  DEMO_EMAIL,
  DEMO_PASSWORD,
  orders,
  products,
  revenueChart,
  users,
} from './mockData'

export async function loginRequest(email: string, password: string): Promise<AuthUser | null> {
  await delay(600)
  if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
    return { id: 'admin-1', name: 'Amirhosain Admin', email: DEMO_EMAIL, role: 'admin' }
  }
  return null
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  await delay(400)
  return dashboardStats
}

export async function fetchRevenueChart(): Promise<RevenuePoint[]> {
  await delay(500)
  return revenueChart
}

export async function fetchCategorySales(): Promise<CategorySale[]> {
  await delay(450)
  return categorySales
}

export async function fetchRecentOrders(): Promise<Order[]> {
  await delay(350)
  return orders
}

export async function fetchUsers(): Promise<User[]> {
  await delay(500)
  return users
}

export async function fetchProducts(): Promise<Product[]> {
  await delay(500)
  return products
}
