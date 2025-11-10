import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import { useDispatch } from "react-redux";
import type { Product } from "@/store/product/productTypes";
import { addToCart } from "@/store/cart/cartSlice";
import { toast } from "react-toastify";

interface Props {
  product: Product;
  className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
  const isOutOfStock = product?.stock === 0;

  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.stock > 0) {
      dispatch(addToCart({ product, quantity: 1 }));
      toast.success(
        `${product.name.substring(0, 12)}... đã thêm vào giỏ hàng!`
      );
    } else {
      toast.error("Không thể thêm sản phẩm");
    }
  };

  return (
    <div className="w-full h-12 flex items-center">
      <Button
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        className={cn(
          "w-full bg-shop_dark_green/80 text-lightBg shadow-none border border-shop_dark_green/80 font-semibold tracking-wide text-white hover:bg-shop_dark_green hover:border-shop_dark_green hoverEffect",
          className
        )}
      >
        <ShoppingBag />{" "}
        {isOutOfStock ? "Sản phẩm bán hết" : "Thêm vào giỏi hàng"}
      </Button>
    </div>
  );
};

export default AddToCartButton;
