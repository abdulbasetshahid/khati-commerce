import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getProducts } from "@/services/data";
import type { Product } from "@/types";
import { ProductGrid } from "@/components/product/ProductGrid";

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="font-serif text-3xl sm:text-4xl text-text-primary text-center mb-12"
        >
          All Products
        </motion.h1>
        <ProductGrid products={products} loading={loading} columns={4} />
      </div>
    </div>
  );
}
