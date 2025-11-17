import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/store/product/productTypes";
import { addItem, removeItem } from "@/store/cart/cartSlice";
import { useDispatch } from "react-redux";
import PriceFormatter from "./PriceFormatter";

interface Props {
  showProduct?: boolean;
  product: Product;
  quantity: number;
  className?: string;
}
const QuantityButtons = ({
  showProduct = false,
  product,
  quantity,
  className,
}: Props) => {
  const dispatch = useDispatch();
  const isOutOfStock = product?.stock === 0;

  return (
    <div className="w-full h-12 flex items-center">
      {showProduct ? (
        <div className="text-sm w-full">
          <div className="flex items-center justify-between">
            <span className="text-xs text-darkColor/80">Số lượng</span>
            <div
              className={cn(
                "flex items-center gap-1 pb-1 text-base",
                className
              )}
            >
              <Button
                onClick={() => dispatch(removeItem({ product }))}
                variant="outline"
                size="icon"
                disabled={quantity === 0 || isOutOfStock}
                className="w-6 h-6 hover:bg-shop_dark_green/20 hoverEffect"
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
                className="w-6 h-6 hover:bg-shop_dark_green/20 hoverEffect"
              >
                <Plus />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between border-t pt-1">
            <span className="text-xs font-semibold">Tổng</span>
            <PriceFormatter
              amount={product?.price ? product?.price * quantity : 0}
            />
          </div>
        </div>
      ) : (
        <div
          className={cn("flex items-center gap-1 pb-1 text-base", className)}
        >
          <Button
            onClick={() => dispatch(removeItem({ product }))}
            variant="outline"
            size="icon"
            disabled={quantity === 0 || isOutOfStock}
            className="w-6 h-6 hover:bg-shop_dark_green/20 hoverEffect"
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
            className="w-6 h-6 hover:bg-shop_dark_green/20 hoverEffect"
          >
            <Plus />
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuantityButtons;
