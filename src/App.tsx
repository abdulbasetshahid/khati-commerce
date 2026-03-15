import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { CartProvider } from '@/context/CartContext';
import { CartDrawerProvider } from '@/context/CartDrawerContext';
import { ToastProvider } from '@/shared/feedback';
import { Layout } from '@/components/layout/Layout';
import { Home } from '@/pages/Home';
import { Products } from '@/pages/Products';
import { Cart } from '@/pages/Cart';
import { Checkout } from '@/pages/Checkout';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CartProvider>
          <CartDrawerProvider>
            <ToastProvider>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="products" element={<Products />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="checkout" element={<Checkout />} />
                </Route>
              </Routes>
            </ToastProvider>
          </CartDrawerProvider>
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
