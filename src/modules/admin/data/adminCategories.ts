import type { Category } from '@/types';
import { getCategories } from '@/services/data';

const STORAGE_KEY = 'khati-admin-categories';

export function loadAdminCategories(): Category[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveAdminCategories(categories: Category[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  } catch {
    // ignore
  }
}

export async function getCategoriesForAdmin(): Promise<Category[]> {
  const stored = loadAdminCategories();
  if (stored.length > 0) return stored;
  return getCategories();
}
