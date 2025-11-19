import { productType } from "@/constant/data";
import { Link } from "react-router-dom";

const HomeTabbar = () => {
  return (
    <div className="flex items-center flex-wrap gap-5 justify-between">
      <div className="flex items-center gap-1.5 text-sm font-semibold">
        <div className="flex items-center gap-1.5 md:gap-3">
          {productType.map((item) => (
            <Link
              to={`/products?category=${item.value}`}
              key={item.title}
              className={`border border-shop_light_green/30 px-4 py-1.5 md:px-6 md:py-2 rounded-full bg-shop_light_green/10 hover:bg-shop_light_green hover:border-shop_light_green hover:text-white hoverEffect`}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
      <Link
        to="/products"
        className="border border-darkColor px-4 py-1 rounded-full hover:bg-shop_light_green hover:text-white hover:border-shop_light_green hoverEffect"
      >
        Tất cả
      </Link>
    </div>
  );
};

export default HomeTabbar;
