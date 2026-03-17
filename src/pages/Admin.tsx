import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getProducts } from "@/services/data";
import type { Product } from "@/types";
import { Card } from "@/shared/display";
import { Button } from "@/shared/ui";
import { Skeleton } from "@/shared/feedback";

// Mock stats (in a real app these would come from an API)
const MOCK_STATS = {
  revenue: 1245000,
  orders: 342,
  customers: 1280,
};

const MOCK_RECENT_ORDERS = [
  { id: "KH-M5X2-A1B2", date: "15 Mar 2026", total: 2850, status: "Delivered" },
  { id: "KH-M5X1-C3D4", date: "14 Mar 2026", total: 1200, status: "Shipped" },
  { id: "KH-M5W9-E5F6", date: "13 Mar 2026", total: 4500, status: "Processing" },
  { id: "KH-M5W8-G7H8", date: "12 Mar 2026", total: 890, status: "Delivered" },
  { id: "KH-M5W7-I9J0", date: "11 Mar 2026", total: 2100, status: "Delivered" },
];

const MOCK_TREND = [12, 19, 15, 24, 22, 28, 34]; // orders per day (last 7 days)

function StatCard({
  label,
  value,
  suffix = "",
  icon,
}: {
  label: string;
  value: number | string;
  suffix?: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-text-secondary font-sans text-sm">{label}</p>
            <p className="mt-1 font-serif text-2xl font-semibold text-text-primary tabular-nums">
              {typeof value === "number"
                ? value >= 1000
                  ? (value / 1000).toFixed(1) + "k"
                  : value
                : value}
              {suffix}
            </p>
          </div>
          <div className="rounded-lg bg-bg-secondary p-2.5 text-text-secondary">
            {icon}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setProductsLoading(false));
  }, []);

  const maxTrend = Math.max(...MOCK_TREND);

  return (
    <div className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-3xl text-text-primary mb-8"
        >
          Admin Dashboard
        </motion.h1>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard
            label="Revenue (BDT)"
            value={`${(MOCK_STATS.revenue / 100000).toFixed(2)} L`}
            suffix=" ৳"
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            }
          />
          <StatCard
            label="Orders"
            value={MOCK_STATS.orders}
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            }
          />
          <StatCard
            label="Customers"
            value={MOCK_STATS.customers}
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            }
          />
          <StatCard
            label="Products"
            value={productsLoading ? "—" : products.length}
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            }
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order trend */}
          <Card className="p-6">
            <h2 className="font-serif text-xl text-text-primary mb-6">
              Order trend (7 days)
            </h2>
            <div className="flex items-end gap-2 h-40">
              {MOCK_TREND.map((val, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${(val / maxTrend) * 100}%` }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="flex-1 min-w-0 rounded-t bg-brand/80 hover:bg-brand transition-colors"
                  title={`${val} orders`}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-text-secondary font-sans">
              <span>Mon</span>
              <span>Sun</span>
            </div>
          </Card>

          {/* Recent orders */}
          <Card className="p-6">
            <h2 className="font-serif text-xl text-text-primary mb-6">
              Recent orders
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-sans">
                <thead>
                  <tr className="border-b border-border text-left text-text-secondary">
                    <th className="py-2 pr-4 font-medium">Order</th>
                    <th className="py-2 pr-4 font-medium">Date</th>
                    <th className="py-2 pr-4 font-medium">Total</th>
                    <th className="py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="text-text-primary">
                  {MOCK_RECENT_ORDERS.map((order) => (
                    <tr key={order.id} className="border-b border-border/60">
                      <td className="py-3 pr-4 font-medium">{order.id}</td>
                      <td className="py-3 pr-4">{order.date}</td>
                      <td className="py-3 pr-4 tabular-nums">৳{order.total.toLocaleString()}</td>
                      <td className="py-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                            order.status === "Delivered"
                              ? "bg-success/20 text-success"
                              : order.status === "Shipped"
                                ? "bg-info/20 text-info"
                                : "bg-warning/20 text-warning"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Product management */}
        <Card className="p-6 mt-8">
          <h2 className="font-serif text-xl text-text-primary mb-6">
            Product management
          </h2>
          {productsLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-sans">
                <thead>
                  <tr className="border-b border-border text-left text-text-secondary">
                    <th className="py-2 pr-4 font-medium">Product</th>
                    <th className="py-2 pr-4 font-medium">Category</th>
                    <th className="py-2 pr-4 font-medium">Price</th>
                    <th className="py-2 pr-4 font-medium">Stock</th>
                    <th className="py-2 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-text-primary">
                  {products.slice(0, 10).map((p) => (
                    <tr key={p.id} className="border-b border-border/60">
                      <td className="py-3 pr-4 font-medium line-clamp-1">{p.name}</td>
                      <td className="py-3 pr-4 capitalize">{p.category}</td>
                      <td className="py-3 pr-4 tabular-nums">৳{p.price.toLocaleString()}</td>
                      <td className="py-3 pr-4">
                        {p.inStock ? (
                          <span className="text-success text-xs font-medium">In stock</span>
                        ) : (
                          <span className="text-error text-xs font-medium">Out of stock</span>
                        )}
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                          <Button variant="secondary" size="sm" className="text-error hover:bg-error/10">
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {!productsLoading && products.length > 10 && (
            <p className="mt-4 text-text-secondary text-sm font-sans">
              Showing 10 of {products.length} products.
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
