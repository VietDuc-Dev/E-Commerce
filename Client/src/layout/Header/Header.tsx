import Container from "@/components/Container";
import Logo from "@/components/Logo";
import HeaderMenu from "./HeaderMenu";
import SearchBar from "@/components/SearchBar";
import CartIcon from "@/components/CartIcon";
import FavoriteButton from "@/components/FavoriteButton";
import LoginButton from "@/components/LoginButton";
import MobileMenu from "./Mobile/MobileMenu";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 py-5 bg-white backdrop-blur-md">
      <Container className="flex items-center justify-between text-lightColor">
        <div className="w-auto flex items-center gap-2.5 justify-start md:gap-0">
          <MobileMenu />
          <Logo />
        </div>
        <HeaderMenu />
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchBar />
          <CartIcon />
          <FavoriteButton />
          <LoginButton />
        </div>
      </Container>
    </header>
  );
};

export default Header;
