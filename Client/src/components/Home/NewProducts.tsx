import { AnimatePresence, motion } from "motion/react";
import ProductCard from "../ProductCard";
import type { Product } from "@/store/product/productTypes";

interface NewProductsProps {
  products: Product[];
}

const NewProducts = ({ products }: NewProductsProps) => {
  return (
    <div>
      {products?.length && (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-10">
          <>
            <AnimatePresence>
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </>
        </div>
      )}
    </div>
  );
};

export default NewProducts;
