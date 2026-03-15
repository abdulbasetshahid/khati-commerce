import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getBestSellers } from "@/services/data";
import type { Product } from "@/types";
import { ProductGrid } from "@/components/product/ProductGrid";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=1920&h=800&fit=crop&q=80";

export function Home() {
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [bestSellersLoading, setBestSellersLoading] = useState(true);

  useEffect(() => {
    getBestSellers()
      .then(setBestSellers)
      .finally(() => setBestSellersLoading(false));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl text-text-inverse font-medium max-w-3xl mx-auto"
          >
            Curated Flavors, Delivered Fresh
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="text-text-inverse/90 text-lg sm:text-xl mt-4 max-w-2xl mx-auto"
          >
            Discover premium food & grocery essentials for the discerning palate.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mt-8"
          >
            <Link
              to="/products"
              className="inline-flex items-center justify-center font-sans font-medium px-6 py-3 text-base rounded-lg bg-brand text-text-inverse hover:bg-brand-hover transition-colors focus:outline-none focus:border-border-focus"
            >
              Shop Collection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-20 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-serif text-3xl text-text-primary text-center mb-12">
            Best Sellers
          </h2>
          <ProductGrid
            products={bestSellers}
            loading={bestSellersLoading}
            columns={4}
          />
        </div>
      </section>

    </div>
  );
}
