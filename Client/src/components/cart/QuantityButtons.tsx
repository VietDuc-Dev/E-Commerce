import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/store/product/productTypes";
import { addItem, removeItem } from "@/store/cart/cartSlice";
import { useDispatch } from "react-redux";

interface Props {
  product: Product;
  quantity: number;
  className?: string;
}
const QuantityButtons = ({ product, quantity, className }: Props) => {
  const dispatch = useDispatch();
  const isOutOfStock = product?.stock === 0;

  return (
    <div className={cn("flex items-center gap-1 pb-1 text-base", className)}>
      <Button
        onClick={() => dispatch(removeItem({ product }))}
        variant="outline"
        size="icon"
        disabled={quantity === 0 || isOutOfStock}
        className="w-6 h-6 border-[1px] hover:bg-shop_dark_green/20 hoverEffect"
      >
        <Minus />
      </Button>
      <span className="font-semibold text-sm w-6 text-center text-darkColor">
        {quantity}
      </span>
      <Button
        onClick={() => dispatch(addItem({ product, quantity }))}
        variant="outline"
        size="icon"
        disabled={isOutOfStock}
        className="w-6 h-6 border-[1px] hover:bg-shop_dark_green/20 hoverEffect"
      >
        <Plus />
      </Button>
    </div>
  );
};

export default QuantityButtons;
