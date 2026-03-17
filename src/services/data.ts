import type { Product, Category } from '@/types';

const BASE_URL = '/data';

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products.json`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.id === id);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.category === category);
}

export async function getBestSellers(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.isBestSeller);
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/categories.json`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}
