import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getProducts } from '@/services/data';
import { useOrders } from '@/context/OrdersContext';
import type { Product } from '@/types';
import { Card } from '@/shared/display';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui';

function StatCard({
  label,
  value,
  suffix = '',
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
              {typeof value === 'number'
                ? value >= 1000
                  ? (value / 1000).toFixed(1) + 'k'
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

const ICON_MONEY = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);
const ICON_ORDERS = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);
const ICON_PEOPLE = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const ICON_BOX = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

export function AdminDashboard() {
  const { orders } = useOrders();
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setProductsLoading(false));
  }, []);

  const revenue = orders.reduce((sum, o) => sum + o.total, 0);
  const recentOrders = orders.slice(0, 5);
  const trend = (() => {
    const last7 = Array(7).fill(0);
    const now = new Date();
    orders.forEach((o) => {
      const d = new Date(o.date);
      const diff = Math.floor((now.getTime() - d.getTime()) / (24 * 60 * 60 * 1000));
      if (diff >= 0 && diff < 7) last7[6 - diff] += 1;
    });
    return last7;
  })();
  const maxTrend = Math.max(...trend, 1);

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-serif text-3xl text-text-primary mb-8"
      >
        Admin Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard
          label="Revenue (BDT)"
          value={`${(revenue / 100000).toFixed(2)} L`}
          suffix=" ৳"
          icon={ICON_MONEY}
        />
        <StatCard label="Orders" value={orders.length} icon={ICON_ORDERS} />
        <StatCard label="Customers" value="—" icon={ICON_PEOPLE} />
        <StatCard
          label="Products"
          value={productsLoading ? '—' : products.length}
          icon={ICON_BOX}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="font-serif text-xl text-text-primary mb-6">
            Order trend (7 days)
          </h2>
          <div className="flex items-end gap-2 h-40">
            {trend.map((val, i) => (
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
            <span>7 days ago</span>
            <span>Today</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl text-text-primary">Recent orders</h2>
            <Link to="/admin/orders">
              <Button variant="ghost" size="sm">View all</Button>
            </Link>
          </div>
          {recentOrders.length === 0 ? (
            <p className="text-text-secondary text-sm font-sans">No orders yet.</p>
          ) : (
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
                  {recentOrders.map((order) => (
                    <tr key={order.orderId} className="border-b border-border/60">
                      <td className="py-3 pr-4 font-medium">{order.orderId}</td>
                      <td className="py-3 pr-4">{order.date}</td>
                      <td className="py-3 pr-4 tabular-nums">৳{order.total.toLocaleString()}</td>
                      <td className="py-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                            order.status === 'delivered'
                              ? 'bg-success/20 text-success'
                              : order.status === 'shipped'
                                ? 'bg-info/20 text-info'
                                : 'bg-warning/20 text-warning'
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
          )}
        </Card>
      </div>
    </div>
  );
}
