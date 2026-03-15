import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCheckout } from "@/context/CheckoutContext";
import { Button } from "@/shared/ui";
import { Card } from "@/shared/display";

function AnimatedCheckmark() {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-success flex items-center justify-center"
      >
        <motion.svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-text-inverse"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.path
            d="M5 13l4 4L19 7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
        </motion.svg>
      </motion.div>
    </div>
  );
}

export function OrderConfirmedStep() {
  const { orderSummary, reset } = useCheckout();

  if (!orderSummary) return null;

  const { orderId, date, items, address, delivery, subtotal, deliveryFee, total } =
    orderSummary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="p-6 sm:p-8">
        <AnimatedCheckmark />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-6"
        >
          <h2 className="font-serif text-2xl text-text-primary">
            Order Confirmed!
          </h2>
          <p className="text-text-secondary text-sm mt-2">
            Thank you for your order. We'll send you a confirmation email shortly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 space-y-6"
        >
          {/* Order details */}
          <div className="bg-bg-secondary rounded-lg p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Order ID</span>
              <span className="font-medium text-text-primary font-mono text-xs">
                {orderId}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Date</span>
              <span className="text-text-primary">{date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Delivery</span>
              <span className="text-text-primary">{delivery.label}</span>
            </div>
          </div>

          {/* Items */}
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-3">
              Items Ordered
            </h3>
            <div className="space-y-2">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 text-sm"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-text-primary truncate">{product.name}</p>
                    <p className="text-text-secondary text-xs">Qty: {quantity}</p>
                  </div>
                  <span className="text-text-primary tabular-nums shrink-0">
                    ৳{(product.price * quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="border-t border-border pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-text-secondary">
              <span>Subtotal</span>
              <span className="tabular-nums">৳{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-text-secondary">
              <span>Delivery</span>
              <span className="tabular-nums">৳{deliveryFee}</span>
            </div>
            <div className="flex justify-between text-text-primary font-semibold text-base pt-2 border-t border-border">
              <span>Total Paid</span>
              <span className="tabular-nums">৳{total.toLocaleString()}</span>
            </div>
          </div>

          {/* Shipping address */}
          <div className="border-t border-border pt-4 text-sm">
            <p className="font-medium text-text-primary text-xs uppercase tracking-wider mb-2">
              Delivery Address
            </p>
            <div className="text-text-secondary space-y-0.5">
              <p>{address.fullName}</p>
              <p>{address.address}, {address.city}</p>
              {address.postalCode && <p>Postal: {address.postalCode}</p>}
              <p>{address.phone}</p>
              <p>{address.email}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Link to="/products" className="flex-1" onClick={reset}>
              <Button variant="primary" size="lg" className="w-full">
                Continue Shopping
              </Button>
            </Link>
            <Link to="/" className="flex-1" onClick={reset}>
              <Button variant="secondary" size="lg" className="w-full">
                Back to Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
}
