import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { CartProvider } from '@/context/CartContext';
import { CartDrawerProvider } from '@/context/CartDrawerContext';
import { OrdersProvider } from '@/context/OrdersContext';
import { ToastProvider } from '@/shared/feedback';
import { Layout } from '@/components/layout/Layout';
import { Home } from '@/pages/Home';
import { Products } from '@/pages/Products';
import { Product } from '@/pages/Product';
import { Cart } from '@/pages/Cart';
import { Checkout } from '@/pages/Checkout';
import { AdminLayout } from '@/modules/admin/AdminLayout';
import { AdminDashboard } from '@/modules/admin/pages/AdminDashboard';
import { CategoriesPage } from '@/modules/admin/pages/CategoriesPage';
import { ProductsPage } from '@/modules/admin/pages/ProductsPage';
import { OrdersPage } from '@/modules/admin/pages/OrdersPage';
import { DaywiseSummaryPage } from '@/modules/admin/pages/DaywiseSummaryPage';
import { UsersPage } from '@/modules/admin/pages/UsersPage';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CartProvider>
          <OrdersProvider>
            <CartDrawerProvider>
              <ToastProvider>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="products" element={<Products />} />
                  <Route path="products/:id" element={<Product />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="categories" element={<CategoriesPage />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="orders" element={<OrdersPage />} />
                    <Route path="daywise-summary" element={<DaywiseSummaryPage />} />
                    <Route path="users" element={<UsersPage />} />
                  </Route>
                </Route>
              </Routes>
              </ToastProvider>
            </CartDrawerProvider>
          </OrdersProvider>
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
