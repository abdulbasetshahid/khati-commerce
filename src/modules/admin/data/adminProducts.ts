import type { Product } from '@/types';
import { getProducts } from '@/services/data';

const STORAGE_KEY = 'khati-admin-products';

export function loadAdminProducts(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveAdminProducts(products: Product[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch {
    // ignore
  }
}

export async function getProductsForAdmin(): Promise<Product[]> {
  const stored = loadAdminProducts();
  if (stored.length > 0) return stored;
  return getProducts();
}
