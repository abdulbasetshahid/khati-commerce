import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { ShippingAddress, DeliveryOption, OrderSummary } from "@/types";

export type CheckoutStep = "address" | "delivery" | "confirmed";

const STEPS: CheckoutStep[] = ["address", "delivery", "confirmed"];

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    id: "dhaka",
    label: "Inside Dhaka",
    description: "Standard delivery within Dhaka city",
    price: 60,
  },
  {
    id: "bangladesh",
    label: "All over Bangladesh",
    description: "Nationwide delivery across Bangladesh",
    price: 120,
  },
];

interface CheckoutContextValue {
  step: CheckoutStep;
  stepIndex: number;
  address: ShippingAddress | null;
  delivery: DeliveryOption | null;
  orderSummary: OrderSummary | null;
  setAddress: (address: ShippingAddress) => void;
  setDelivery: (option: DeliveryOption) => void;
  confirmOrder: (summary: OrderSummary) => void;
  goToStep: (step: CheckoutStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<CheckoutStep>("address");
  const [address, setAddressState] = useState<ShippingAddress | null>(null);
  const [delivery, setDeliveryState] = useState<DeliveryOption | null>(null);
  const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null);

  const stepIndex = STEPS.indexOf(step);

  const goToStep = useCallback((s: CheckoutStep) => setStep(s), []);

  const nextStep = useCallback(() => {
    const idx = STEPS.indexOf(step);
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1]);
  }, [step]);

  const prevStep = useCallback(() => {
    const idx = STEPS.indexOf(step);
    if (idx > 0) setStep(STEPS[idx - 1]);
  }, [step]);

  const setAddress = useCallback((addr: ShippingAddress) => {
    setAddressState(addr);
  }, []);

  const setDelivery = useCallback((opt: DeliveryOption) => {
    setDeliveryState(opt);
  }, []);

  const confirmOrder = useCallback((summary: OrderSummary) => {
    setOrderSummary(summary);
  }, []);

  const reset = useCallback(() => {
    setStep("address");
    setAddressState(null);
    setDeliveryState(null);
    setOrderSummary(null);
  }, []);

  return (
    <CheckoutContext.Provider
      value={{
        step,
        stepIndex,
        address,
        delivery,
        orderSummary,
        setAddress,
        setDelivery,
        confirmOrder,
        goToStep,
        nextStep,
        prevStep,
        reset,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout(): CheckoutContextValue {
  const ctx = useContext(CheckoutContext);
  if (!ctx) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return ctx;
}
