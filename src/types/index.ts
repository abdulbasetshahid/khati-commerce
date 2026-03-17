export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  image: string;
  images: string[];
  category: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isBestSeller?: boolean;
  weight: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface DeliveryOption {
  id: string;
  label: string;
  description: string;
  price: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface OrderSummary {
  orderId: string;
  date: string;
  items: CartItem[];
  address: ShippingAddress;
  delivery: DeliveryOption;
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered';

export interface Order extends OrderSummary {
  status: OrderStatus;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}
