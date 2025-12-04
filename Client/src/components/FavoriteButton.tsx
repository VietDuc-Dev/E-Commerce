import type { Product } from "@/store/product/productTypes";
import { Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  showProduct?: boolean;
  product?: Product | null | undefined;
}

const FavoriteButton = ({ showProduct = false }: Props) => {
  const [existingProduct, setExistingProduct] = useState<boolean>(false);

  // const [existingProduct, setExistingProduct] = useState<Product | null>(null);
  // useEffect(() => {
  //   const availableItem = favoriteProduct.find(
  //     (item) => item?.id === product?.id
  //   );
  //   setExistingProduct(availableItem || null);
  // }, [product, favoriteProduct]);

  const handleFavorite = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setExistingProduct(!existingProduct);
  };
  return (
    <>
      {!showProduct ? (
        <Link to="/wishlist" className="group relative">
          <Heart className="w-5 h-5 hover:text-shop_light_green hoverEffect" />
          <span className="absolute -top-1 -right-1 bg-shop_dark_green text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
            5
          </span>
        </Link>
      ) : (
        <button
          onClick={handleFavorite}
          className="group relative hover:text-shop_light_green hoverEffect border border-shop_light_green/80 hover:border-shop_light_green p-1.5 rounded-sm"
        >
          {existingProduct ? (
            <Heart
              fill="#3b9c3c"
              className="text-shop_light_green/80 group-hover:text-shop_light_green hoverEffect mt-.5 w-5 h-5"
            />
          ) : (
            <Heart className="text-shop_light_green/80 group-hover:text-shop_light_green hoverEffect mt-.5 w-5 h-5" />
          )}
        </button>
      )}
    </>
  );
};

export default FavoriteButton;
