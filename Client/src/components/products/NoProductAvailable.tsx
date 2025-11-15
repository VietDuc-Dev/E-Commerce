import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const NoProductAvailable = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-800">
          Không có sản phẩm nào được tìm thấy
        </h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-gray-600"
      >
        Rất tiếc, hiện tại không có sản phẩm nào phù hợp với tìm kiếm của bạn.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-sm text-gray-500"
      >
        Vui lòng kiểm tra lại sau hoặc khám phá các danh mục sản phẩm khác của
        chúng tôi.
      </motion.p>
    </div>
  );
};

export default NoProductAvailable;
