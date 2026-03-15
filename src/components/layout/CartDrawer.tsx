import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useCartDrawer } from "@/context/CartDrawerContext";
import { Button } from "@/shared/ui";

function DrawerQuantityControl({
  quantity,
  onIncrement,
  onDecrement,
}: {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  return (
    <div className="flex items-center border border-border rounded-md">
      <button
        type="button"
        onClick={onDecrement}
        className="w-7 h-7 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors rounded-l-md"
        aria-label="Decrease quantity"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <span className="w-8 text-center text-xs font-medium text-text-primary tabular-nums">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        className="w-7 h-7 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors rounded-r-md"
        aria-label="Increase quantity"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  );
}

export function CartDrawer() {
  const { isOpen, closeDrawer } = useCartDrawer();
  const { items, updateQuantity, removeItem, subtotal, itemCount } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/40"
            onClick={closeDrawer}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-bg-primary border-l border-border shadow-lg flex flex-col"
            role="dialog"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h2 className="font-serif text-lg text-text-primary">
                Cart{" "}
                <span className="text-text-secondary text-sm font-sans">
                  ({itemCount} {itemCount === 1 ? "item" : "items"})
                </span>
              </h2>
              <button
                type="button"
                onClick={closeDrawer}
                className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors"
                aria-label="Close cart"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 mb-4 rounded-full bg-bg-secondary flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-text-secondary"
                    >
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                  </div>
                  <p className="text-text-secondary text-sm mb-4">Your cart is empty</p>
                  <Button variant="secondary" size="sm" onClick={closeDrawer}>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <ul className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {items.map(({ product, quantity }) => (
                      <motion.li
                        key={product.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex gap-3"
                      >
                        <Link
                          to={`/products/${product.slug}`}
                          onClick={closeDrawer}
                          className="shrink-0"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1">
                            <Link
                              to={`/products/${product.slug}`}
                              onClick={closeDrawer}
                              className="min-w-0"
                            >
                              <p className="text-sm text-text-primary hover:text-brand transition-colors truncate font-medium">
                                {product.name}
                              </p>
                            </Link>
                            <button
                              type="button"
                              onClick={() => removeItem(product.id)}
                              className="shrink-0 p-1 rounded text-text-secondary hover:text-error transition-colors"
                              aria-label={`Remove ${product.name}`}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                            </button>
                          </div>
                          <p className="text-text-secondary text-xs">{product.weight}</p>
                          <div className="flex items-center justify-between mt-2">
                            <DrawerQuantityControl
                              quantity={quantity}
                              onIncrement={() => updateQuantity(product.id, quantity + 1)}
                              onDecrement={() => updateQuantity(product.id, quantity - 1)}
                            />
                            <p className="text-sm font-semibold text-text-primary tabular-nums">
                              ৳{(product.price * quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border px-5 py-4 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Subtotal</span>
                  <span className="font-semibold text-text-primary tabular-nums">
                    ৳{subtotal.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-text-secondary">
                  Delivery calculated at checkout
                </p>
                <Link to="/checkout" onClick={closeDrawer} className="block">
                  <Button variant="primary" size="lg" className="w-full">
                    Checkout
                  </Button>
                </Link>
                <Link
                  to="/cart"
                  onClick={closeDrawer}
                  className="block text-center text-sm text-text-secondary hover:text-brand transition-colors"
                >
                  View Full Cart
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
