import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getProductById, getProductsByCategory } from "@/services/data";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useCartDrawer } from "@/context/CartDrawerContext";
import { useToast } from "@/shared/feedback";
import { Button } from "@/shared/ui";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Skeleton } from "@/shared/feedback";

export function Product() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { openDrawer } = useCartDrawer();
  const { showToast } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getProductById(id)
      .then((p) => {
        setProduct(p ?? null);
        if (p) {
          setSelectedImageIndex(0);
          getProductsByCategory(p.category)
            .then((list) =>
              setRelated(list.filter((item) => item.id !== p.id).slice(0, 4))
            )
            .catch(() => setRelated([]));
        } else {
          setRelated([]);
        }
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  const images = product
    ? product.images?.length
      ? product.images
      : [product.image]
    : [];

  const handleAddToCart = () => {
    if (!product || !product.inStock) return;
    addItem(product, quantity);
    showToast("Added to cart!", "success");
    openDrawer();
  };

  if (loading) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="space-y-6">
              <Skeleton className="h-9 w-3/4" />
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-full rounded-md" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-20 text-center">
        <p className="text-text-secondary text-lg mb-6">Product not found.</p>
        <Button variant="primary" onClick={() => navigate("/products")}>
          View all products
        </Button>
      </div>
    );
  }

  const { name, price, originalPrice, description, weight, inStock } = product;

  return (
    <div className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
        >
          {/* Gallery */}
          <div className="space-y-3">
            <div className="aspect-square rounded-lg overflow-hidden bg-bg-secondary border border-border">
              <img
                src={images[selectedImageIndex] ?? product.image}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedImageIndex(i)}
                    className={`shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-border-focus ${
                      selectedImageIndex === i
                        ? "border-brand"
                        : "border-border hover:border-text-secondary"
                    }`}
                  >
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl text-text-primary">
              {name}
            </h1>
            <div className="mt-3 flex items-center gap-3 flex-wrap">
              <span className="font-semibold text-lg text-text-primary">
                ৳{price.toLocaleString()}
              </span>
              {originalPrice != null && (
                <span className="text-text-secondary text-sm line-through">
                  ৳{originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <div className="flex items-center justify-between gap-2 mt-2">
              <p className="text-text-secondary text-sm">{weight}</p>
              {!inStock && (
                <span className="text-error text-sm font-medium">
                  Out of stock
                </span>
              )}
            </div>
            <p className="mt-6 text-text-secondary text-sm leading-relaxed">
              {description}
            </p>

            {/* Quantity + Add to cart */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              {inStock && (
                <div className="flex items-center border border-border rounded-md w-fit">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-text-primary hover:bg-bg-secondary transition-colors rounded-l-md"
                    aria-label="Decrease quantity"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14" />
                    </svg>
                  </button>
                  <span className="w-12 text-center font-medium text-text-primary tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-text-primary hover:bg-bg-secondary transition-colors rounded-r-md"
                    aria-label="Increase quantity"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                  </button>
                </div>
              )}
              <Button
                variant="primary"
                size="lg"
                className="sm:flex-1"
                onClick={handleAddToCart}
                disabled={!inStock}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-20 pt-12 border-t border-border">
            <h2 className="font-serif text-2xl text-text-primary mb-8">
              You may also like
            </h2>
            <ProductGrid products={related} columns={4} />
          </section>
        )}
      </div>
    </div>
  );
}
