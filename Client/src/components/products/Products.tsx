import type { Product } from "@/store/product/productTypes";
import { AnimatePresence, motion } from "motion/react";
import Container from "../Container";
import { Title } from "../ui/text";
import ProductCard from "../ProductCard";
import Loading from "../Loading";
import NoProductAvailable from "./NoProductAvailable";
import { useState } from "react";
import SearchWithAI from "../SearchWithAi";
import PriceRange from "./PriceRange";
import Rating from "./Rating";
import Availability from "./Availability";
import Category from "./Category";

interface ProductsGird {
  products: Product[];
}

const Products = ({ products }: ProductsGird) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="border-t">
      <Container className="mt-5">
        <div className="sticky top-0 z-10 mb-5">
          <div className="flex items-center justify-between space-x-3">
            <Title className="text-lg uppercase tracking-wide">
              Nhận sản phẩm theo nhu cầu của bạn
            </Title>

            <SearchWithAI />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 border-t border-t-shop_dark_green/50">
          {/* Filter */}
          <div className="md:sticky md:top-20 md:self-start md:h-[calc(100vh-160px)] md:overflow-y-auto md:min-w-64 pb-5 md:border-r border-r-shop_btn_dark_green/50 scrollbar-hide flex-1 -space-y-5">
            <PriceRange />
            <Rating />
            <Category />
            <Availability />
          </div>
          <div className=" pt-5">
            <div className="h-[calc(100vh-160px)] overflow-y-auto pr-2 scrollbar-hide">
              {loading ? (
                <Loading />
              ) : products?.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
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
                </div>
              ) : (
                <NoProductAvailable className="bg-white mt-0" />
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Products;
