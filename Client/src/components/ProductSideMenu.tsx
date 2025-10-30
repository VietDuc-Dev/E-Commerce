import { cn } from "@/lib/utils";
import type { ProductType } from "@/types/api.type";
import { Heart } from "lucide-react";

const ProductSideMenu = ({
  product,
  className,
}: {
  product: ProductType;
  className?: string;
}) => {
  //   const { favoriteProduct, addToFavorite } = useStore();
  //   const [existingProduct, setExistingProduct] = useState<Product | null>(null);
  //   useEffect(() => {
  //     const availableProduct = favoriteProduct?.find(
  //       (item) => item?._id === product?.id
  //     );
  //     setExistingProduct(availableProduct || null);
  //   }, [product, favoriteProduct]);
  //   const handleFavorite = (e: React.MouseEvent<HTMLSpanElement>) => {
  //     e.preventDefault();
  //     if (product?._id) {
  //       addToFavorite(product).then(() => {
  //         toast.success(
  //           existingProduct
  //             ? "Product removed successfully!"
  //             : "Product added successfully!"
  //         );
  //       });
  //     }
  //   };
  return (
    <div
      className={cn("absolute top-2 right-2 hover:cursor-pointer", className)}
    >
      <div
        className={`p-2.5 rounded-full hover:bg-shop_dark_green/80 hover:text-white hoverEffect`}
      >
        <Heart size={15} />
      </div>
    </div>
  );
};

export default ProductSideMenu;
