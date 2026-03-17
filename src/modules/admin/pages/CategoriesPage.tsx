import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Category } from '@/types';
import {
  getCategoriesForAdmin,
  loadAdminCategories,
  saveAdminCategories,
} from '../data/adminCategories';
import { Card } from '@/shared/display';
import { Button } from '@/shared/ui';
import { Input } from '@/shared/ui';
import { useToast } from '@/shared/feedback';

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({ name: '', slug: '', image: '' });
  const { showToast } = useToast();

  const load = () => {
    setLoading(true);
    getCategoriesForAdmin()
      .then(setCategories)
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const startAdd = () => {
    setEditingId(null);
    setIsAdding(true);
    setForm({ name: '', slug: '', image: '' });
  };

  const startEdit = (c: Category) => {
    setEditingId(c.id);
    setIsAdding(false);
    setForm({ name: c.name, slug: c.slug, image: c.image });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    setForm({ name: '', slug: '', image: '' });
  };

  const save = () => {
    const name = form.name.trim();
    if (!name) {
      showToast('Name is required', 'error');
      return;
    }
    const slug = form.slug.trim() || slugify(name);
    const image = form.image.trim() || 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop&q=80';

    const list = loadAdminCategories();
    const base = list.length > 0 ? list : categories;

    if (editingId) {
      const next = base.map((c) =>
        c.id === editingId ? { ...c, name, slug, image } : c
      );
      setCategories(next);
      saveAdminCategories(next);
      showToast('Category updated');
    } else {
      const id = String(Date.now());
      const newCat: Category = {
        id,
        name,
        slug,
        image,
        productCount: 0,
      };
      const next = [...(base.length ? base : categories), newCat];
      setCategories(next);
      saveAdminCategories(next);
      showToast('Category created');
    }
    cancelEdit();
  };

  const remove = (id: string) => {
    if (!window.confirm('Delete this category?')) return;
    const list = loadAdminCategories();
    const base = list.length > 0 ? list : categories;
    const next = base.filter((c) => c.id !== id);
    setCategories(next);
    saveAdminCategories(next);
    showToast('Category deleted', 'success');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-3xl text-text-primary"
        >
          Categories
        </motion.h1>
        <Button variant="primary" size="md" onClick={startAdd}>
          Add Category
        </Button>
      </div>

      {(editingId || isAdding) && (
        <Card className="p-6 mb-6">
          <h2 className="font-serif text-lg text-text-primary mb-4">
            {editingId ? 'Edit category' : 'New category'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Name"
              value={form.name}
              onChange={(e) =>
                setForm((f) => ({ ...f, name: e.target.value, slug: f.slug || slugify(e.target.value) }))
              }
              placeholder="Category name"
            />
            <Input
              label="Slug"
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              placeholder="url-slug"
            />
            <Input
              label="Image URL"
              value={form.image}
              onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
              placeholder="https://..."
            />
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
        {loading ? (
          <p className="text-text-secondary font-sans">Loading...</p>
        ) : categories.length === 0 ? (
          <p className="text-text-secondary font-sans">No categories. Add one above.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="border-b border-border text-left text-text-secondary">
                  <th className="py-2 pr-4 font-medium">Name</th>
                  <th className="py-2 pr-4 font-medium">Slug</th>
                  <th className="py-2 pr-4 font-medium">Products</th>
                  <th className="py-2 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-text-primary">
                {categories.map((c) => (
                  <tr key={c.id} className="border-b border-border/60">
                    <td className="py-3 pr-4 font-medium">{c.name}</td>
                    <td className="py-3 pr-4 text-text-secondary">{c.slug}</td>
                    <td className="py-3 pr-4">{c.productCount}</td>
                    <td className="py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => startEdit(c)}>
                          Edit
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="text-error hover:bg-error/10"
                          onClick={() => remove(c.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
