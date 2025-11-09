import { Link } from "react-router-dom";
import { Title } from "./ui/text";
import { StarIcon } from "lucide-react";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";
import ProductSideMenu from "./ProductSideMenu";
import type { Product } from "@/store/product/productTypes";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="text-sm border-[1px] rounded-md border-darkBlue/20 group bg-white">
      <div className="relative group overflow-hidden bg-shop_light_bg">
        {product?.images && (
          <Link to={`/product`}>
            <img
              src={product?.images[0]?.url}
              alt="productImage"
              width={500}
              height={500}
              className={`w-full h-64 object-contain overflow-hidden transition-transform bg-shop_light_bg duration-500 
              ${product?.stock !== 0 ? "group-hover:scale-105" : "opacity-50"}`}
            />
          </Link>
        )}
        <ProductSideMenu product={product} />

        {product && (
          <p className="absolute top-2 left-2 z-10 text-xs border border-shop_orange/50 px-2 rounded-full group-hover:border-lightGreen hover:text-shop_dark_green hoverEffect">
            New!
          </p>
        )}
      </div>

      <div className="p-3 flex flex-col gap-2">
        {product?.category && (
          <p className="uppercase line-clamp-1 text-xs font-medium text-lightText">
            {product.category}
          </p>
        )}
        <Title className="text-sm line-clamp-1">{product?.name}</Title>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                size={13}
                key={index}
                className={
                  index < Math.floor(product.ratings)
                    ? "text-shop_light_green"
                    : " text-lightText"
                }
                fill={
                  index < Math.floor(product.ratings) ? "#93D991" : "#ababab"
                }
              />
            ))}
          </div>
          <p className="text-lightText text-xs tracking-wide">
            {product.review_count} đánh giá
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <p className="font-medium">Sản phẩm còn lại</p>
          <p
            className={`${
              product?.stock === 3
                ? "text-red-600"
                : "text-shop_dark_green/80 font-semibold"
            }`}
          >
            {(product?.stock as number) > 0 ? product?.stock : "hết hàng"}
          </p>
        </div>

        <PriceView price={product?.price} className="text-sm" />
        <AddToCartButton product={product} className="rounded-full" />
      </div>
    </div>
  );
};

export default ProductCard;
