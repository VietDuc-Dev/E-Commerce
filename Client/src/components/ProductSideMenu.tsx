"use client";
import { cn } from "@/lib/utils";
import type { Product } from "@/store/product/productTypes";
import { Heart } from "lucide-react";
import { useState } from "react";

const ProductSideMenu = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  const [existingProduct, setExistingProduct] = useState<Product | null>(null);

  const handleFavorite = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
  };
  return (
    <div
      className={cn("absolute top-2 right-2 hover:cursor-pointer", className)}
    >
      <div
        onClick={handleFavorite}
        className={`p-2.5 rounded-full hover:bg-shop_dark_green/80 hover:text-white hoverEffect  ${
          existingProduct
            ? "bg-shop_dark_green/80 text-white"
            : "bg-lightColor/10"
        }`}
      >
        <Heart size={15} />
      </div>
    </div>
  );
};

export default ProductSideMenu;
