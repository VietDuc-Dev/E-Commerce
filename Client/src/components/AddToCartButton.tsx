import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { Product } from "@/store/product/productTypes";
import { addToCart } from "@/store/cart/cartSlice";
import { toast } from "react-toastify";
import type { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import QuantityButtons from "./QuantityButtons";

interface Props {
  product: Product;
  className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
  const { cart } = useSelector((state: RootState) => state.cart);
  const [itemCount, setItemCount] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    const found = cart.find((item) => item.product.id === product.id);
    setItemCount(found ? found.quantity : 0);
  }, [cart, product.id]);

  const isOutOfStock = product.stock === 0;

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isOutOfStock) {
      toast.error("Không thể thêm sản phẩm");
      return;
    }

    dispatch(addToCart({ product, quantity: 1 }));
  };

  return (
    <div className="w-full h-12 flex items-center">
      {itemCount === 0 ? (
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={cn(
            "w-full bg-shop_dark_green/80 text-lightBg shadow-none border border-shop_dark_green/80 font-semibold tracking-wide text-white hover:bg-shop_dark_green hover:border-shop_dark_green hoverEffect",
            className
          )}
        >
          <ShoppingBag />
          {isOutOfStock ? "Sản phẩm bán hết" : "Thêm vào giỏ hàng"}
        </Button>
      ) : (
        <QuantityButtons
          showProduct={true}
          product={product}
          quantity={itemCount}
        />
      )}
    </div>
  );
};

export default AddToCartButton;
