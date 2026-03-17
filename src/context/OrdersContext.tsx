import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import type { OrderSummary, Order, OrderStatus } from '@/types';

const STORAGE_KEY = 'khati-orders';

function loadOrders(): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveOrders(orders: Order[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch {
    // ignore
  }
}

interface OrdersContextValue {
  orders: Order[];
  addOrder: (summary: OrderSummary) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

const OrdersContext = createContext<OrdersContextValue | null>(null);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(loadOrders());
  }, []);

  const addOrder = useCallback((summary: OrderSummary) => {
    const order: Order = { ...summary, status: 'pending' };
    setOrders((prev) => {
      const next = [order, ...prev];
      saveOrders(next);
      return next;
    });
  }, []);

  const updateOrderStatus = useCallback((orderId: string, status: OrderStatus) => {
    setOrders((prev) => {
      const next = prev.map((o) =>
        o.orderId === orderId ? { ...o, status } : o
      );
      saveOrders(next);
      return next;
    });
  }, []);

  return (
    <OrdersContext.Provider value={{ orders, addOrder, updateOrderStatus }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders(): OrdersContextValue {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error('useOrders must be used within OrdersProvider');
  return ctx;
}
