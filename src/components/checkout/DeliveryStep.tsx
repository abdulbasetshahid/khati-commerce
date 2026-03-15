import { useState } from "react";
import { motion } from "framer-motion";
import { useCheckout, DELIVERY_OPTIONS } from "@/context/CheckoutContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/shared/ui";
import { Card } from "@/shared/display";
import type { DeliveryOption, OrderSummary } from "@/types";

function generateOrderId(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `KH-${ts}-${rand}`;
}

export function DeliveryStep() {
  const { address, delivery, setDelivery, prevStep, confirmOrder, nextStep } = useCheckout();
  const { items, subtotal, clearCart } = useCart();
  const [selected, setSelected] = useState<DeliveryOption | null>(
    delivery ?? null
  );
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const deliveryFee = selected?.price ?? 0;
  const total = subtotal + deliveryFee;

  const handleSelect = (option: DeliveryOption) => {
    setSelected(option);
    setError("");
  };

  const handlePlaceOrder = async () => {
    if (!selected) {
      setError("Please select a delivery option");
      return;
    }
    if (!address) return;

    setProcessing(true);
    setDelivery(selected);

    await new Promise((r) => setTimeout(r, 800));

    const summary: OrderSummary = {
      orderId: generateOrderId(),
      date: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      items: [...items],
      address,
      delivery: selected,
      subtotal,
      deliveryFee: selected.price,
      total: subtotal + selected.price,
    };

    confirmOrder(summary);
    clearCart();
    nextStep();
    setProcessing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
    >
      <Card className="p-6">
        <h2 className="font-serif text-xl text-text-primary mb-6">
          Delivery Option
        </h2>

        <div className="space-y-3">
          {DELIVERY_OPTIONS.map((option) => {
            const isActive = selected?.id === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelect(option)}
                disabled={processing}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  isActive
                    ? "border-brand bg-brand/5"
                    : "border-border hover:border-text-secondary"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isActive ? "border-brand" : "border-border"
                      }`}
                    >
                      {isActive && (
                        <div className="w-2.5 h-2.5 rounded-full bg-brand" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-text-primary text-sm">
                        {option.label}
                      </p>
                      <p className="text-text-secondary text-xs mt-0.5">
                        {option.description}
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold text-text-primary text-sm tabular-nums">
                    ৳{option.price}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {error && (
          <p className="text-xs text-error mt-3">{error}</p>
        )}

        {/* Order review */}
        <div className="mt-6 pt-4 border-t border-border">
          <h3 className="text-sm font-medium text-text-primary mb-3">
            Order Summary
          </h3>
          <div className="space-y-2 text-sm">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between text-text-secondary">
                <span className="truncate mr-2">
                  {product.name} &times; {quantity}
                </span>
                <span className="tabular-nums shrink-0">
                  ৳{(product.price * quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-border space-y-2 text-sm">
            <div className="flex justify-between text-text-secondary">
              <span>Subtotal</span>
              <span className="tabular-nums">৳{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-text-secondary">
              <span>Delivery</span>
              <span className="tabular-nums">
                {selected ? `৳${deliveryFee}` : "—"}
              </span>
            </div>
            <div className="flex justify-between text-text-primary font-semibold text-base pt-2 border-t border-border">
              <span>Total</span>
              <span className="tabular-nums">৳{total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Shipping summary */}
        {address && (
          <div className="mt-4 pt-4 border-t border-border text-sm text-text-secondary">
            <p className="font-medium text-text-primary text-xs uppercase tracking-wider mb-1">
              Shipping to
            </p>
            <p>{address.fullName}</p>
            <p>{address.address}, {address.city}</p>
            <p>{address.phone}</p>
          </div>
        )}

        <div className="flex gap-3 pt-6">
          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="flex-1"
            onClick={prevStep}
            disabled={processing}
          >
            Back
          </Button>
          <Button
            type="button"
            variant="primary"
            size="lg"
            className="flex-1"
            onClick={handlePlaceOrder}
            disabled={processing}
          >
            {processing ? "Placing Order..." : "Place Order"}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
