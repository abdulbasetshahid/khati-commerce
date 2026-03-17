import type { User } from '@/types';

const STORAGE_KEY = 'khati-admin-users';

const SEED_USERS: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@khati.com', role: 'admin', createdAt: '2025-01-01' },
  { id: '2', name: 'Manager', email: 'manager@khati.com', role: 'manager', createdAt: '2025-01-15' },
];

export function loadAdminUsers(): User[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return SEED_USERS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SEED_USERS;
  } catch {
    return SEED_USERS;
  }
}

export function saveAdminUsers(users: User[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch {
    // ignore
  }
}
