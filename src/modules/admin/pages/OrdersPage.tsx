import { motion } from 'framer-motion';
import { useOrders } from '@/context/OrdersContext';
import type { OrderStatus } from '@/types';
import { Card } from '@/shared/display';
import { useToast } from '@/shared/feedback';

const STATUS_OPTIONS: OrderStatus[] = [
  'pending',
  'confirmed',
  'processing',
  'shipped',
  'delivered',
];

const statusClass: Record<OrderStatus, string> = {
  pending: 'bg-warning/20 text-warning',
  confirmed: 'bg-info/20 text-info',
  processing: 'bg-info/20 text-info',
  shipped: 'bg-info/20 text-info',
  delivered: 'bg-success/20 text-success',
};

export function OrdersPage() {
  const { orders, updateOrderStatus } = useOrders();
  const { showToast } = useToast();

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    updateOrderStatus(orderId, status);
    showToast('Order status updated', 'success');
  };

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-serif text-3xl text-text-primary mb-8"
      >
        Order management
      </motion.h1>

      <Card className="p-6">
        <h2 className="font-serif text-xl text-text-primary mb-6">
          Recent orders
        </h2>
        {orders.length === 0 ? (
          <p className="text-text-secondary font-sans">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="border-b border-border text-left text-text-secondary">
                  <th className="py-2 pr-4 font-medium">Order ID</th>
                  <th className="py-2 pr-4 font-medium">Date</th>
                  <th className="py-2 pr-4 font-medium">Customer</th>
                  <th className="py-2 pr-4 font-medium">Total</th>
                  <th className="py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-text-primary">
                {orders.map((order) => (
                  <tr key={order.orderId} className="border-b border-border/60">
                    <td className="py-3 pr-4 font-medium">{order.orderId}</td>
                    <td className="py-3 pr-4">{order.date}</td>
                    <td className="py-3 pr-4">
                      {order.address.fullName}
                      <span className="text-text-secondary text-xs block">
                        {order.address.phone}
                      </span>
                    </td>
                    <td className="py-3 pr-4 tabular-nums">
                      ৳{order.total.toLocaleString()}
                    </td>
                    <td className="py-3">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(
                            order.orderId,
                            e.target.value as OrderStatus
                          )
                        }
                        className={`px-2 py-1 rounded text-xs font-medium border border-border bg-bg-primary focus:outline-none focus:ring-2 focus:ring-border-focus/30 ${statusClass[order.status]}`}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
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
