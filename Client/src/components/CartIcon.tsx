import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const CartIcon = () => {
  return (
    <Link to="/cart" className="group relative">
      <ShoppingBag className="w-5 h-5 hover:text-shop_light_green hoverEffect" />
      <span className="absolute -top-1 -right-1 bg-shop_dark_green text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
        9
      </span>
    </Link>
  );
};

export default CartIcon;
