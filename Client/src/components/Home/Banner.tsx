import { Link } from "react-router-dom";
import { Title } from "../ui/text";
import ImgBanner from "@/assets/Image/banner.png";

const Banner = () => {
  return (
    <div className="py-16 md:py-0 bg-shop_light_pink rounded-lg px-10 lg:px-24 flex items-center justify-between h-[250px]">
      <div className="space-y-5">
        <Title>
          Online Store <br />
          Cửa hàng dàng cho mọi nhà
        </Title>
        <Link
          to="/products"
          className="bg-shop_dark_green/90 text-white/90 px-5 py-2 rounded-md text-sm font-semibold hover:text-white hover:bg-shop_dark_green hoverEffect"
        >
          Mua ngay
        </Link>
      </div>
      <div>
        <img
          loading="lazy"
          src={ImgBanner}
          alt="Banner"
          className="hidden md:inline-flex w-96 "
        />
      </div>
    </div>
  );
};

export default Banner;
