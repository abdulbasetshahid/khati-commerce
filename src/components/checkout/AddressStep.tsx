import { useState } from "react";
import { motion } from "framer-motion";
import { useCheckout } from "@/context/CheckoutContext";
import { Button, Input } from "@/shared/ui";
import { Card } from "@/shared/display";
import type { ShippingAddress } from "@/types";

const EMPTY_ADDRESS: ShippingAddress = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  postalCode: "",
};

export function AddressStep() {
  const { address, setAddress, nextStep } = useCheckout();
  const [form, setForm] = useState<ShippingAddress>(address ?? EMPTY_ADDRESS);
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingAddress, string>>>({});

  const update = (field: keyof ShippingAddress, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof ShippingAddress, string>> = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required";
    if (!form.phone.trim()) next.phone = "Phone number is required";
    if (!form.email.trim()) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email";
    }
    if (!form.address.trim()) next.address = "Address is required";
    if (!form.city.trim()) next.city = "City is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setAddress(form);
      nextStep();
    }
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
          Shipping Address
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              error={errors.fullName}
            />
            <Input
              label="Phone"
              type="tel"
              placeholder="01XXXXXXXXX"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              error={errors.phone}
            />
          </div>
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            error={errors.email}
          />
          <Input
            label="Address"
            placeholder="House, road, area"
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            error={errors.address}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="City"
              placeholder="Dhaka"
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
              error={errors.city}
            />
            <Input
              label="Postal Code"
              placeholder="1200 (optional)"
              value={form.postalCode}
              onChange={(e) => update("postalCode", e.target.value)}
              error={errors.postalCode}
            />
          </div>
          <div className="pt-4">
            <Button type="submit" variant="primary" size="lg" className="w-full">
              Continue to Delivery
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
}
