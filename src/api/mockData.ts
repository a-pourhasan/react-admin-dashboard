import type {
  CategorySale,
  DashboardStats,
  Order,
  Product,
  RevenuePoint,
  User,
} from '@/types'

export const DEMO_EMAIL = 'demo@admin.com'
export const DEMO_PASSWORD = 'admin123'

export const users: User[] = [
  { id: '1', name: 'Sarah Chen', email: 'sarah@acme.io', role: 'admin', status: 'active', joinedAt: '2024-01-15', avatar: 'SC' },
  { id: '2', name: 'James Wilson', email: 'james@acme.io', role: 'editor', status: 'active', joinedAt: '2024-03-22', avatar: 'JW' },
  { id: '3', name: 'Maria Garcia', email: 'maria@acme.io', role: 'editor', status: 'pending', joinedAt: '2025-11-08', avatar: 'MG' },
  { id: '4', name: 'David Kim', email: 'david@acme.io', role: 'viewer', status: 'active', joinedAt: '2025-02-14', avatar: 'DK' },
  { id: '5', name: 'Emma Brown', email: 'emma@acme.io', role: 'viewer', status: 'inactive', joinedAt: '2023-09-30', avatar: 'EB' },
  { id: '6', name: 'Oliver Lee', email: 'oliver@acme.io', role: 'editor', status: 'active', joinedAt: '2025-06-01', avatar: 'OL' },
  { id: '7', name: 'Sophie Martin', email: 'sophie@acme.io', role: 'viewer', status: 'active', joinedAt: '2025-08-19', avatar: 'SM' },
  { id: '8', name: 'Liam Taylor', email: 'liam@acme.io', role: 'admin', status: 'active', joinedAt: '2024-07-11', avatar: 'LT' },
  { id: '9', name: 'Ava Johnson', email: 'ava@acme.io', role: 'editor', status: 'inactive', joinedAt: '2024-12-05', avatar: 'AJ' },
  { id: '10', name: 'Noah Davis', email: 'noah@acme.io', role: 'viewer', status: 'pending', joinedAt: '2026-01-20', avatar: 'ND' },
  { id: '11', name: 'Isabella White', email: 'isabella@acme.io', role: 'editor', status: 'active', joinedAt: '2025-04-17', avatar: 'IW' },
  { id: '12', name: 'Ethan Moore', email: 'ethan@acme.io', role: 'viewer', status: 'active', joinedAt: '2025-10-03', avatar: 'EM' },
]

export const products: Product[] = [
  { id: 'p1', name: 'Wireless Headphones', category: 'Electronics', price: 129, stock: 84, status: 'in_stock', image: '🎧' },
  { id: 'p2', name: 'Ergonomic Chair', category: 'Furniture', price: 349, stock: 12, status: 'low_stock', image: '🪑' },
  { id: 'p3', name: 'USB-C Hub', category: 'Electronics', price: 49, stock: 156, status: 'in_stock', image: '🔌' },
  { id: 'p4', name: 'Standing Desk', category: 'Furniture', price: 599, stock: 0, status: 'out_of_stock', image: '🖥️' },
  { id: 'p5', name: 'Mechanical Keyboard', category: 'Electronics', price: 159, stock: 43, status: 'in_stock', image: '⌨️' },
  { id: 'p6', name: 'Monitor Light Bar', category: 'Electronics', price: 79, stock: 8, status: 'low_stock', image: '💡' },
  { id: 'p7', name: 'Notebook Set', category: 'Stationery', price: 24, stock: 200, status: 'in_stock', image: '📓' },
  { id: 'p8', name: 'Desk Organizer', category: 'Stationery', price: 35, stock: 67, status: 'in_stock', image: '📦' },
  { id: 'p9', name: 'Webcam 4K', category: 'Electronics', price: 189, stock: 31, status: 'in_stock', image: '📷' },
  { id: 'p10', name: 'Coffee Mug Set', category: 'Home', price: 42, stock: 5, status: 'low_stock', image: '☕' },
]

export const orders: Order[] = [
  { id: 'ORD-1042', customer: 'Sarah Chen', email: 'sarah@mail.com', total: 478, status: 'completed', date: '2026-05-30' },
  { id: 'ORD-1041', customer: 'James Wilson', email: 'james@mail.com', total: 129, status: 'shipped', date: '2026-05-29' },
  { id: 'ORD-1040', customer: 'Maria Garcia', email: 'maria@mail.com', total: 948, status: 'processing', date: '2026-05-29' },
  { id: 'ORD-1039', customer: 'David Kim', email: 'david@mail.com', total: 49, status: 'completed', date: '2026-05-28' },
  { id: 'ORD-1038', customer: 'Emma Brown', email: 'emma@mail.com', total: 208, status: 'cancelled', date: '2026-05-27' },
  { id: 'ORD-1037', customer: 'Oliver Lee', email: 'oliver@mail.com', total: 599, status: 'shipped', date: '2026-05-27' },
  { id: 'ORD-1036', customer: 'Sophie Martin', email: 'sophie@mail.com', total: 114, status: 'completed', date: '2026-05-26' },
]

export const dashboardStats: DashboardStats = {
  revenue: 48250,
  revenueChange: 12.4,
  orders: 1248,
  ordersChange: 8.2,
  customers: 3842,
  customersChange: 5.1,
  products: 156,
  productsChange: -2.3,
}

export const revenueChart: RevenuePoint[] = [
  { month: 'Jan', revenue: 32000, orders: 890 },
  { month: 'Feb', revenue: 35000, orders: 920 },
  { month: 'Mar', revenue: 31000, orders: 850 },
  { month: 'Apr', revenue: 38000, orders: 1010 },
  { month: 'May', revenue: 42000, orders: 1100 },
  { month: 'Jun', revenue: 48250, orders: 1248 },
]

export const categorySales: CategorySale[] = [
  { category: 'Electronics', sales: 4200 },
  { category: 'Furniture', sales: 2800 },
  { category: 'Stationery', sales: 1500 },
  { category: 'Home', sales: 980 },
]
