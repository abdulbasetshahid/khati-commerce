import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/admin', end: true, label: 'Dashboard' },
  { to: '/admin/categories', end: false, label: 'Categories' },
  { to: '/admin/products', end: false, label: 'Products' },
  { to: '/admin/orders', end: false, label: 'Order' },
  { to: '/admin/daywise-summary', end: false, label: 'Daywise Summary' },
  { to: '/admin/users', end: false, label: 'User' },
];

export function AdminSidebar() {
  return (
    <aside className="w-56 shrink-0 border-r border-[var(--border)] bg-[var(--bg-secondary)] p-4">
      <nav className="flex flex-col gap-1 font-sans text-sm">
        {NAV_ITEMS.map(({ to, end, label }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `block rounded-md px-3 py-2 font-medium transition-colors ${
                isActive
                  ? 'bg-[var(--brand)] text-[var(--text-inverse)]'
                  : 'text-[var(--text-primary)] hover:bg-[var(--bg-primary)]'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
