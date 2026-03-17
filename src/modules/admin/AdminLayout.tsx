import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';

export function AdminLayout() {
  return (
    <div className="flex min-h-[60vh]">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-6 bg-[var(--bg-primary)]">
        <Outlet />
      </main>
    </div>
  );
}
