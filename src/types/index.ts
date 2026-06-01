export type UserRole = 'admin' | 'editor' | 'viewer'
export type UserStatus = 'active' | 'inactive' | 'pending'
export type ProductStatus = 'in_stock' | 'low_stock' | 'out_of_stock'
export type OrderStatus = 'completed' | 'processing' | 'cancelled' | 'shipped'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  joinedAt: string
  avatar: string
}

export interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: ProductStatus
  image: string
}

export interface Order {
  id: string
  customer: string
  email: string
  total: number
  status: OrderStatus
  date: string
}

export interface DashboardStats {
  revenue: number
  revenueChange: number
  orders: number
  ordersChange: number
  customers: number
  customersChange: number
  products: number
  productsChange: number
}

export interface RevenuePoint {
  month: string
  revenue: number
  orders: number
}

export interface CategorySale {
  category: string
  sales: number
}

export interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
}
