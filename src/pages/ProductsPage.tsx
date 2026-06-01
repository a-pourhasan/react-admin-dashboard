import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { fetchProducts } from '@/api/client'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'
import { Spinner } from '@/components/ui/Spinner'
import { formatCurrency } from '@/lib/utils'
import type { ProductStatus } from '@/types'

const statusVariant: Record<ProductStatus, 'success' | 'warning' | 'danger'> = {
  in_stock: 'success',
  low_stock: 'warning',
  out_of_stock: 'danger',
}

const statusLabel: Record<ProductStatus, string> = {
  in_stock: 'In stock',
  low_stock: 'Low stock',
  out_of_stock: 'Out of stock',
}

export function ProductsPage() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const categories = useMemo(
    () => ['all', ...new Set(products.map((p) => p.category))],
    [products],
  )

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return products.filter(
      (p) =>
        (category === 'all' || p.category === category) &&
        (!q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)),
    )
  }, [products, search, category])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Products</h1>
        <p className="text-slate-500 dark:text-slate-400">Inventory and catalog management</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === 'all' ? 'All categories' : c}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((product) => (
            <Card key={product.id} className="overflow-hidden transition-shadow hover:shadow-md">
              <CardContent className="space-y-4">
                <div className="flex items-start justify-between">
                  <span className="text-4xl" role="img" aria-hidden>
                    {product.image}
                  </span>
                  <Badge variant={statusVariant[product.status]}>
                    {statusLabel[product.status]}
                  </Badge>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">{product.name}</h3>
                  <p className="text-sm text-slate-500">{product.category}</p>
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                  <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                    {formatCurrency(product.price)}
                  </span>
                  <span className="text-sm text-slate-500">{product.stock} in stock</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && filtered.length === 0 && (
        <p className="text-center text-slate-500">No products match your filters.</p>
      )}
    </div>
  )
}
