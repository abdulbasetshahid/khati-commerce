import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useOrders } from '@/context/OrdersContext';
import { Card } from '@/shared/display';

interface DayRow {
  date: string;
  orderCount: number;
  revenue: number;
}

export function DaywiseSummaryPage() {
  const { orders } = useOrders();

  const daywise = useMemo(() => {
    const map = new Map<string, { count: number; revenue: number }>();
    orders.forEach((o) => {
      const date = o.date; // e.g. "15 March 2026"
      const existing = map.get(date) ?? { count: 0, revenue: 0 };
      map.set(date, {
        count: existing.count + 1,
        revenue: existing.revenue + o.total,
      });
    });
    const rows: DayRow[] = Array.from(map.entries())
      .map(([date, { count, revenue }]) => ({ date, orderCount: count, revenue }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return rows;
  }, [orders]);

  const totalOrders = daywise.reduce((s, d) => s + d.orderCount, 0);
  const totalRevenue = daywise.reduce((s, d) => s + d.revenue, 0);

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-serif text-3xl text-text-primary mb-8"
      >
        Daywise Summary
      </motion.h1>

      <Card className="p-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-text-secondary font-sans text-sm">Total orders</p>
            <p className="font-serif text-2xl font-semibold text-text-primary tabular-nums">
              {totalOrders}
            </p>
          </div>
          <div>
            <p className="text-text-secondary font-sans text-sm">Total revenue (BDT)</p>
            <p className="font-serif text-2xl font-semibold text-text-primary tabular-nums">
              ৳{totalRevenue.toLocaleString()}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="font-serif text-xl text-text-primary mb-6">
          By day
        </h2>
        {daywise.length === 0 ? (
          <p className="text-text-secondary font-sans">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="border-b border-border text-left text-text-secondary">
                  <th className="py-2 pr-4 font-medium">Date</th>
                  <th className="py-2 pr-4 font-medium">Orders</th>
                  <th className="py-2 font-medium">Revenue (BDT)</th>
                </tr>
              </thead>
              <tbody className="text-text-primary">
                {daywise.map((row) => (
                  <tr key={row.date} className="border-b border-border/60">
                    <td className="py-3 pr-4 font-medium">{row.date}</td>
                    <td className="py-3 pr-4 tabular-nums">{row.orderCount}</td>
                    <td className="py-3 tabular-nums">
                      ৳{row.revenue.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
