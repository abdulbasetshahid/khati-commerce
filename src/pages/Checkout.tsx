import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckoutProvider, useCheckout, type CheckoutStep } from "@/context/CheckoutContext";
import { useCart } from "@/context/CartContext";
import { AddressStep } from "@/components/checkout/AddressStep";
import { DeliveryStep } from "@/components/checkout/DeliveryStep";
import { OrderConfirmedStep } from "@/components/checkout/OrderConfirmedStep";
import { Button } from "@/shared/ui";

const STEP_LABELS: { key: CheckoutStep; label: string }[] = [
  { key: "address", label: "Address" },
  { key: "delivery", label: "Delivery" },
  { key: "confirmed", label: "Confirmed" },
];

function StepIndicator() {
  const { stepIndex } = useCheckout();

  return (
    <div className="flex items-center justify-center mb-10">
      {STEP_LABELS.map((s, i) => {
        const isCompleted = i < stepIndex;
        const isCurrent = i === stepIndex;

        return (
          <div key={s.key} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                  isCompleted
                    ? "bg-brand text-text-inverse"
                    : isCurrent
                      ? "bg-brand text-text-inverse"
                      : "bg-bg-secondary text-text-secondary border border-border"
                }`}
              >
                {isCompleted ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={`text-xs mt-1.5 font-sans hidden sm:block ${
                  isCurrent ? "text-brand font-medium" : "text-text-secondary"
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div
                className={`w-8 sm:w-16 h-0.5 mx-1 sm:mx-2 transition-colors ${
                  i < stepIndex ? "bg-brand" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function CheckoutContent() {
  const { step } = useCheckout();
  const { items } = useCart();

  if (items.length === 0 && step !== "confirmed") {
    return (
      <div className="text-center py-16">
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
        <p className="text-text-secondary text-lg mb-6">
          Your cart is empty. Add some items before checking out.
        </p>
        <Link to="/products">
          <Button variant="primary" size="lg">
            Browse Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <StepIndicator />
      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {step === "address" && <AddressStep key="address" />}
          {step === "delivery" && <DeliveryStep key="delivery" />}
          {step === "confirmed" && <OrderConfirmedStep key="confirmed" />}
        </AnimatePresence>
      </div>
    </>
  );
}

export function Checkout() {
  return (
    <CheckoutProvider>
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="font-serif text-3xl sm:text-4xl text-text-primary text-center mb-8"
          >
            Checkout
          </motion.h1>
          <CheckoutContent />
        </div>
      </div>
    </CheckoutProvider>
  );
}
