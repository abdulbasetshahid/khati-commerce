import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useCartDrawer } from "@/context/CartDrawerContext";
import { Button } from "@/shared/ui";
import { Badge, Card } from "@/shared/display";
import { useToast } from "@/shared/feedback";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { openDrawer } = useCartDrawer();
  const { showToast } = useToast();
  const {
    name,
    slug,
    price,
    originalPrice,
    shortDescription,
    image,
    weight,
    inStock,
    isBestSeller,
  } = product;

  const handleAddToCart = () => {
    addItem(product);
    showToast("Added to cart!", "success");
    openDrawer();
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card
        className="h-full overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
        hover
      >
        <Link to={`/products/${slug}`} className="block relative">
          <div className="relative aspect-square overflow-hidden rounded-t-lg">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
            {isBestSeller && (
              <div className="absolute top-2 left-2">
                <Badge variant="success">Best Seller</Badge>
              </div>
            )}
            {!inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="error">Out of Stock</Badge>
              </div>
            )}
          </div>
        </Link>
        <div className="p-4 flex flex-col flex-1">
          <Link to={`/products/${slug}`}>
            <h3 className="font-serif text-lg text-text-primary hover:text-brand transition-colors line-clamp-1">
              {name}
            </h3>
          </Link>
          <p className="text-text-secondary text-sm mt-1 line-clamp-1">
            {shortDescription}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="font-semibold text-text-primary">
              ৳{price.toLocaleString()}
            </span>
            {originalPrice != null && (
              <span className="text-text-secondary text-sm line-through">
                ৳{originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <p className="text-text-secondary text-xs mt-0.5">{weight}</p>
          <div className="mt-4">
            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={handleAddToCart}
              disabled={!inStock}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
