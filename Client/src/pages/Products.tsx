import Products from "@/components/products/Products";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const ProductsPage = () => {
  const { products } = useSelector((state: RootState) => state.product);
  return (
    <div className="bg-white">
      <Products products={products} />
    </div>
  );
};

export default ProductsPage;
