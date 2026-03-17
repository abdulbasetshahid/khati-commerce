import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Product } from '@/types';
import {
  getProductsForAdmin,
  loadAdminProducts,
  saveAdminProducts,
} from '../data/adminProducts';
import { getCategoriesForAdmin } from '../data/adminCategories';
import type { Category } from '@/types';
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

const defaultImage =
  'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&h=600&fit=crop&q=80';

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({
    name: '',
    slug: '',
    price: '',
    category: '',
    description: '',
    shortDescription: '',
    image: '',
    weight: '500g',
    inStock: true,
  });
  const { showToast } = useToast();

  const loadProducts = () => {
    setLoading(true);
    getProductsForAdmin()
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
    getCategoriesForAdmin().then(setCategories).catch(() => setCategories([]));
  }, []);

  const startAdd = () => {
    setEditingId(null);
    setIsAdding(true);
    setForm({
      name: '',
      slug: '',
      price: '',
      category: categories[0]?.slug ?? '',
      description: '',
      shortDescription: '',
      image: defaultImage,
      weight: '500g',
      inStock: true,
    });
  };

  const startEdit = (p: Product) => {
    setEditingId(p.id);
    setIsAdding(false);
    setForm({
      name: p.name,
      slug: p.slug,
      price: String(p.price),
      category: p.category,
      description: p.description,
      shortDescription: p.shortDescription,
      image: p.image,
      weight: p.weight,
      inStock: p.inStock,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    setForm({
      name: '',
      slug: '',
      price: '',
      category: '',
      description: '',
      shortDescription: '',
      image: '',
      weight: '500g',
      inStock: true,
    });
  };

  const save = () => {
    const name = form.name.trim();
    if (!name) {
      showToast('Name is required', 'error');
      return;
    }
    const price = parseInt(form.price, 10);
    if (Number.isNaN(price) || price < 0) {
      showToast('Valid price is required', 'error');
      return;
    }
    const slug = form.slug.trim() || slugify(name);
    const image = form.image.trim() || defaultImage;
    const list = loadAdminProducts();
    const base = list.length > 0 ? list : products;

    const baseProduct: Partial<Product> = {
      name,
      slug,
      price,
      category: form.category || (categories[0]?.slug ?? ''),
      description: form.description.trim() || name,
      shortDescription: form.shortDescription.trim() || name,
      image,
      images: [image],
      weight: form.weight.trim() || '500g',
      inStock: form.inStock,
      tags: [],
      rating: 0,
      reviewCount: 0,
    };

    if (editingId) {
      const next = base.map((p) =>
        p.id === editingId ? { ...p, ...baseProduct } : p
      );
      setProducts(next);
      saveAdminProducts(next);
      showToast('Product updated');
    } else {
      const id = String(Date.now());
      const newProduct: Product = {
        ...baseProduct,
        id,
        name: baseProduct.name!,
        slug: baseProduct.slug!,
        price: baseProduct.price!,
        description: baseProduct.description!,
        shortDescription: baseProduct.shortDescription!,
        image: baseProduct.image!,
        images: baseProduct.images!,
        category: baseProduct.category!,
        tags: baseProduct.tags!,
        rating: baseProduct.rating!,
        reviewCount: baseProduct.reviewCount!,
        inStock: baseProduct.inStock!,
        weight: baseProduct.weight!,
      };
      const next = [...(base.length ? base : products), newProduct];
      setProducts(next);
      saveAdminProducts(next);
      showToast('Product created');
    }
    cancelEdit();
  };

  const remove = (id: string) => {
    if (!window.confirm('Delete this product?')) return;
    const list = loadAdminProducts();
    const base = list.length > 0 ? list : products;
    const next = base.filter((p) => p.id !== id);
    setProducts(next);
    saveAdminProducts(next);
    showToast('Product deleted', 'success');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-3xl text-text-primary"
        >
          Products
        </motion.h1>
        <Button variant="primary" size="md" onClick={startAdd}>
          Add Product
        </Button>
      </div>

      {(editingId || isAdding) && (
        <Card className="p-6 mb-6">
          <h2 className="font-serif text-lg text-text-primary mb-4">
            {editingId ? 'Edit product' : 'New product'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Name"
              value={form.name}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  name: e.target.value,
                  slug: f.slug || slugify(e.target.value),
                }))
              }
              placeholder="Product name"
            />
            <Input
              label="Slug"
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              placeholder="url-slug"
            />
            <Input
              label="Price (BDT)"
              type="number"
              value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
              placeholder="0"
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-primary font-sans">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full px-3 py-2.5 text-sm font-sans text-text-primary bg-bg-primary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-border-focus/30"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <Input
              label="Short description"
              value={form.shortDescription}
              onChange={(e) =>
                setForm((f) => ({ ...f, shortDescription: e.target.value }))
              }
              placeholder="Brief description"
            />
            <Input
              label="Weight"
              value={form.weight}
              onChange={(e) => setForm((f) => ({ ...f, weight: e.target.value }))}
              placeholder="500g"
            />
            <Input
              label="Image URL"
              value={form.image}
              onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
              placeholder="https://..."
              className="md:col-span-2"
            />
            <div className="md:col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="inStock"
                checked={form.inStock}
                onChange={(e) =>
                  setForm((f) => ({ ...f, inStock: e.target.checked }))
                }
                className="rounded border-border"
              />
              <label htmlFor="inStock" className="text-sm font-sans text-text-primary">
                In stock
              </label>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-text-primary font-sans block mb-1.5">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Full description"
                rows={3}
                className="w-full px-3 py-2.5 text-sm font-sans text-text-primary bg-bg-primary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-border-focus/30"
              />
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
        {loading ? (
          <p className="text-text-secondary font-sans">Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-text-secondary font-sans">No products. Add one above.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="border-b border-border text-left text-text-secondary">
                  <th className="py-2 pr-4 font-medium">Product</th>
                  <th className="py-2 pr-4 font-medium">Category</th>
                  <th className="py-2 pr-4 font-medium">Price</th>
                  <th className="py-2 pr-4 font-medium">Stock</th>
                  <th className="py-2 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-text-primary">
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-border/60">
                    <td className="py-3 pr-4 font-medium line-clamp-1">{p.name}</td>
                    <td className="py-3 pr-4 capitalize">{p.category}</td>
                    <td className="py-3 pr-4 tabular-nums">৳{p.price.toLocaleString()}</td>
                    <td className="py-3 pr-4">
                      {p.inStock ? (
                        <span className="text-success text-xs font-medium">In stock</span>
                      ) : (
                        <span className="text-error text-xs font-medium">Out of stock</span>
                      )}
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => startEdit(p)}>
                          Edit
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="text-error hover:bg-error/10"
                          onClick={() => remove(p.id)}
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
