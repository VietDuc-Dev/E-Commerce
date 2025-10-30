import { useState } from "react";
import Container from "../Container";
import HomeTabbar from "../HomeTabbar";
import { AnimatePresence, motion } from "motion/react";
import { Loader2 } from "lucide-react";
import NoProductAvailable from "../NoProductAvailable";
import ProductCard from "../ProductCard";

const products = [
  {
    id: "17b1ef11-efbe-4bdb-8852-d001d3898481",
    name: "oppo",
    description: "oppooooooooooooo",
    price: 10000.0,
    category: "phone",
    ratings: 0.0,
    images: [
      {
        url: "https://res.cloudinary.com/dw7jcqluj/image/upload/v1761251138/Ecommerce_Product_Images/gbihnd5qhyt8uwdgoait.jpg",
        public_id: "Ecommerce_Product_Images/gbihnd5qhyt8uwdgoait",
      },
      {
        url: "https://res.cloudinary.com/dw7jcqluj/image/upload/v1761251139/Ecommerce_Product_Images/n4bd4xh5wxsu5vogbzem.jpg",
        public_id: "Ecommerce_Product_Images/n4bd4xh5wxsu5vogbzem",
      },
    ],
    stock: 5,
    created_by: "80a6107a-f83d-4944-938e-a0491dd14aa7",
    created_at: "2025-10-23T20:25:41.467Z",
    review_count: 0,
  },
];

const ProductGrid = () => {
  const [loading, setLoading] = useState(false);
  return (
    <Container className="flex flex-col lg:px-0 my-10">
      <HomeTabbar />
      {loading ? (
        <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10">
          <motion.div className="flex items-center space-x-2 text-shop_light_green">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Loading...</span>
          </motion.div>
        </div>
      ) : products?.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-10">
          <>
            {products?.map((product) => (
              <AnimatePresence key={product?.id}>
                <motion.div
                  layout
                  initial={{ opacity: 0.2 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ProductCard key={product?.id} product={product} />
                </motion.div>
              </AnimatePresence>
            ))}
          </>
        </div>
      ) : (
        <NoProductAvailable selectedTab={selectedTab} />
      )}
    </Container>
  );
};

export default ProductGrid;
