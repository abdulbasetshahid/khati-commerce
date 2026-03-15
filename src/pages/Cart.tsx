import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { Button } from "@/shared/ui";
import { Card } from "@/shared/display";

function QuantityControl({
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
        className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors rounded-l-md"
        aria-label="Decrease quantity"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <span className="w-10 text-center text-sm font-medium text-text-primary tabular-nums">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors rounded-r-md"
        aria-label="Increase quantity"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  );
}

export function Cart() {
  const { items, updateQuantity, removeItem, subtotal, clearCart } = useCart();

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="font-serif text-3xl sm:text-4xl text-text-primary text-center mb-12"
        >
          Your Cart
        </motion.h1>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-bg-secondary flex items-center justify-center">
              <svg
                width="32"
                height="32"
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
            <p className="text-text-secondary text-lg mb-6">Your cart is empty</p>
            <Link to="/products">
              <Button variant="primary" size="lg">
                Browse Products
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-text-secondary text-sm">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </p>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-sm text-error hover:underline transition-colors"
                >
                  Clear cart
                </button>
              </div>

              <AnimatePresence mode="popLayout">
                {items.map(({ product, quantity }) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Card className="p-4">
                      <div className="flex gap-4">
                        <Link
                          to={`/products/${product.slug}`}
                          className="shrink-0"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md"
                          />
                        </Link>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <Link to={`/products/${product.slug}`}>
                                <h3 className="font-serif text-base text-text-primary hover:text-brand transition-colors truncate">
                                  {product.name}
                                </h3>
                              </Link>
                              <p className="text-text-secondary text-xs mt-0.5">
                                {product.weight}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(product.id)}
                              className="shrink-0 p-1.5 rounded-md text-text-secondary hover:text-error hover:bg-bg-secondary transition-colors"
                              aria-label={`Remove ${product.name}`}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <QuantityControl
                              quantity={quantity}
                              onIncrement={() => updateQuantity(product.id, quantity + 1)}
                              onDecrement={() => updateQuantity(product.id, quantity - 1)}
                            />
                            <p className="font-semibold text-text-primary tabular-nums">
                              ৳{(product.price * quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                <Card className="p-6 sticky top-24">
                  <h2 className="font-serif text-xl text-text-primary mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-text-secondary">
                      <span>Subtotal</span>
                      <span className="tabular-nums">৳{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-text-secondary">
                      <span>Delivery</span>
                      <span className="text-text-secondary italic">Calculated at checkout</span>
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between text-text-primary font-semibold text-base">
                      <span>Estimated Total</span>
                      <span className="tabular-nums">৳{subtotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <Link to="/checkout" className="block mt-6">
                    <Button variant="primary" size="lg" className="w-full">
                      Proceed to Checkout
                    </Button>
                  </Link>

                  <Link
                    to="/products"
                    className="block text-center text-sm text-text-secondary hover:text-brand transition-colors mt-4"
                  >
                    Continue Shopping
                  </Link>
                </Card>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
