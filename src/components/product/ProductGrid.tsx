import { motion } from "framer-motion";
import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { Skeleton } from "@/shared/feedback";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  columns?: 2 | 3 | 4;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

function ProductSkeleton() {
  return (
    <div className="bg-bg-primary border border-border rounded-lg overflow-hidden">
      <Skeleton className="aspect-square w-full rounded-t-lg rounded-b-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-9 w-full rounded-md" />
      </div>
    </div>
  );
}

export function ProductGrid({
  products,
  loading = false,
  columns = 4,
}: ProductGridProps) {
  const gridCols =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 3
        ? "sm:grid-cols-2 md:grid-cols-3"
        : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

  if (loading) {
    return (
      <div className={`grid grid-cols-1 ${gridCols} gap-6`}>
        {Array.from({ length: 8 }, (_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`grid grid-cols-1 ${gridCols} gap-6`}
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={itemVariants}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}
