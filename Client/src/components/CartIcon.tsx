import type { RootState } from "@/store/store";
import { ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartIcon = () => {
  const dispatch = useDispatch();

  const { cart } = useSelector((state: RootState) => state.cart);
  const cartItemsCount =
    cart?.reduce((total, item) => total + item.quantity, 0) ?? 0;

  return (
    <Link to="/cart">
      <div className="group relative">
        <ShoppingBag className="w-5 h-5 hover:text-shop_light_green hoverEffect" />

        {cartItemsCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-shop_dark_green text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
            {cartItemsCount}
          </span>
        )}
      </div>
    </Link>
  );
};

export default CartIcon;
