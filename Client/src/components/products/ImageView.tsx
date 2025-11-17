import type { ProductImageType } from "@/store/product/productTypes";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface ProductImagesProps {
  images: ProductImageType[];
}

const ImageView = (images: ProductImagesProps) => {
  const [active, setActive] = useState(images.images[0]);
  console.log(active);

  return (
    <div className="w-full md:w-1/2 space-y-2 md:space-y-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={active?.url}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-h-[550px] min-h-[450px] border border-darkColor/10 rounded-md group overflow-hidden"
        >
          <img
            src={active.url}
            alt="productImage"
            width={700}
            height={700}
            className={`w-full h-96 max-h-[550px] min-h-[500px] object-contain group-hover:scale-110 hoverEffect rounded-md `}
          />
        </motion.div>
      </AnimatePresence>
      <div className="grid grid-cols-6 gap-2 h-20 md:h-24">
        {images.images?.map((image) => (
          <button
            key={image?.public_id}
            onClick={() => setActive(image)}
            className={`border rounded-md overflow-hidden ${
              active?.public_id === image?.public_id
                ? "border-darkColor opacity-100"
                : "opacity-80"
            }`}
          >
            <img
              src={image.url}
              alt={`Thumbnail ${image.url}`}
              width={100}
              height={100}
              className="w-full h-auto object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageView;
