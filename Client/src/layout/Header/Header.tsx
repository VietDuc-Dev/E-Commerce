import Container from "@/components/Container";
import Logo from "@/components/Logo";
import HeaderMenu from "./HeaderMenu";
import CartIcon from "@/components/CartIcon";
import FavoriteButton from "@/components/FavoriteButton";
import LoginButton from "@/components/LoginButton";
import MobileMenu from "./Mobile/MobileMenu";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { Link } from "react-router-dom";
import { Logs, Search } from "lucide-react";

const Header = () => {
  const { authUser } = useSelector((state: RootState) => state.auth);
  const { myOrders } = useSelector((state: RootState) => state.order);

  return (
    <header className="sticky top-0 z-50 py-5 bg-white/70 backdrop-blur-md">
      <Container className="flex items-center justify-between text-lightColor">
        <div className="w-auto flex items-center gap-2.5 justify-start md:gap-0">
          <MobileMenu />
          <Logo />
        </div>
        <HeaderMenu />
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <Link to={"/products"}>
            <Search className="w-5 h-5 hover:text-shop_light_green hoverEffect" />
          </Link>
          <CartIcon />
          <FavoriteButton />

          {authUser && (
            <Link
              to={"/orders"}
              className="group relative hover:text-shop_light_green hoverEffect"
            >
              <Logs />
              <span className="absolute -top-1 -right-1 bg-shop_btn_dark_green text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
                {myOrders?.length ? myOrders?.length : 0}
              </span>
            </Link>
          )}

          <LoginButton />
        </div>
      </Container>
    </header>
  );
};

export default Header;
