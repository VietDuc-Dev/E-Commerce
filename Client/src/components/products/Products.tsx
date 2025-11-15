import type { Product } from "@/store/product/productTypes";
import { AnimatePresence, motion } from "motion/react";
import Container from "../Container";
import { Title } from "../ui/text";
import ProductCard from "../ProductCard";
import NoProductAvailable from "./NoProductAvailable";
import { useEffect, useState } from "react";
import SearchProducts from "./SearchProduct";
import PriceRange from "./PriceRange";
import Rating from "./Rating";
import Availability from "./Availability";
import Category from "./Category";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { fetchAllProducts } from "@/store/product/productThunks";
import { useLocation } from "react-router-dom";
import SearchWithAi from "./SearchWithAi";

interface ProductsGird {
  products: Product[];
}

const Products = ({ products }: ProductsGird) => {
  const dispatch = useDispatch<AppDispatch>();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const searchTerm = query.get("search");
  const searchedCategory = query.get("category");

  const [searchQuery, setSearchQuery] = useState<string>(searchTerm || "");
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchedCategory || ""
  );
  const [availability, setAvailability] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handleRatingChange = (value: number) => {
    setSelectedRating(value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleAvailabilityChange = (value: string) => {
    console.log(value);

    setAvailability(value);
  };

  useEffect(() => {
    dispatch(
      fetchAllProducts({
        search: searchQuery,
        price: `${priceRange[0]}-${priceRange[1]}`,
        ratings: selectedRating,
        category: selectedCategory,
        availability: availability,
        page: 1,
      })
    );
  }, [searchQuery, priceRange, selectedRating, selectedCategory, availability]);

  return (
    <div className="border-t">
      <Container className="my-5">
        <div className="sticky top-0 z-10 mb-5">
          <div className="flex items-center justify-between space-x-3">
            <Title className="text-lg uppercase tracking-wide">
              Nhận sản phẩm theo nhu cầu của bạn
            </Title>

            <div className="flex flex-1 space-x-2">
              <SearchProducts onSearchChange={handleSearchChange} />
              <SearchWithAi />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 border-t border-t-shop_dark_green/50">
          {/* Filter */}
          <div className="md:sticky md:top-20 md:self-start md:h-[calc(100vh-160px)] md:overflow-y-auto md:min-w-64 pb-5 md:border-r border-r-shop_btn_dark_green/50 scrollbar-hide -space-y-5 flex-1">
            <PriceRange onPriceRangeChange={handlePriceRangeChange} />
            <Rating onRatingChange={handleRatingChange} />
            <Category onCategoryChange={handleCategoryChange} />
            <Availability onAvailabilityChange={handleAvailabilityChange} />
          </div>
          <div className="flex-auto w-full pt-5">
            <div className="h-[calc(100vh-160px)] overflow-y-auto pr-2 scrollbar-hide">
              {products?.length > 0 ? (
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
