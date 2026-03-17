import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { User } from '@/types';
import {
  loadAdminUsers,
  saveAdminUsers,
} from '../data/adminUsers';
import { Card } from '@/shared/display';
import { Button } from '@/shared/ui';
import { Input } from '@/shared/ui';
import { useToast } from '@/shared/feedback';

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'customer',
  });
  const { showToast } = useToast();

  useEffect(() => {
    setUsers(loadAdminUsers());
  }, []);

  const startAdd = () => {
    setEditingId(null);
    setIsAdding(true);
    setForm({ name: '', email: '', role: 'customer' });
  };

  const startEdit = (u: User) => {
    setEditingId(u.id);
    setIsAdding(false);
    setForm({ name: u.name, email: u.email, role: u.role });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    setForm({ name: '', email: '', role: 'customer' });
  };

  const save = () => {
    const name = form.name.trim();
    const email = form.email.trim();
    if (!name || !email) {
      showToast('Name and email are required', 'error');
      return;
    }
    const list = loadAdminUsers();

    if (editingId) {
      const next = list.map((u) =>
        u.id === editingId
          ? { ...u, name, email, role: form.role }
          : u
      );
      setUsers(next);
      saveAdminUsers(next);
      showToast('User updated');
    } else {
      const id = String(Date.now());
      const newUser: User = {
        id,
        name,
        email,
        role: form.role,
        createdAt: new Date().toISOString().slice(0, 10),
      };
      const next = [...list, newUser];
      setUsers(next);
      saveAdminUsers(next);
      showToast('User created');
    }
    cancelEdit();
  };

  const remove = (id: string) => {
    if (!window.confirm('Remove this user?')) return;
    const next = users.filter((u) => u.id !== id);
    setUsers(next);
    saveAdminUsers(next);
    showToast('User removed', 'success');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-3xl text-text-primary"
        >
          User management
        </motion.h1>
        <Button variant="primary" size="md" onClick={startAdd}>
          Add User
        </Button>
      </div>

      {(editingId || isAdding) && (
        <Card className="p-6 mb-6">
          <h2 className="font-serif text-lg text-text-primary mb-4">
            {editingId ? 'Edit user' : 'New user'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Full name"
            />
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="email@example.com"
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-primary font-sans">
                Role
              </label>
              <select
                value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                className="w-full px-3 py-2.5 text-sm font-sans text-text-primary bg-bg-primary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-border-focus/30"
              >
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="customer">Customer</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="primary" size="md" onClick={save}>
              Save
            </Button>
            <Button variant="secondary" size="md" onClick={cancelEdit}>
              Cancel
            </Button>
          </div>
        </Card>
      )}

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-sans">
            <thead>
              <tr className="border-b border-border text-left text-text-secondary">
                <th className="py-2 pr-4 font-medium">Name</th>
                <th className="py-2 pr-4 font-medium">Email</th>
                <th className="py-2 pr-4 font-medium">Role</th>
                <th className="py-2 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-text-primary">
              {users.map((u) => (
                <tr key={u.id} className="border-b border-border/60">
                  <td className="py-3 pr-4 font-medium">{u.name}</td>
                  <td className="py-3 pr-4 text-text-secondary">{u.email}</td>
                  <td className="py-3 pr-4 capitalize">{u.role}</td>
                  <td className="py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => startEdit(u)}>
                        Edit
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="text-error hover:bg-error/10"
                        onClick={() => remove(u.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
