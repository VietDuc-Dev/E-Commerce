import { Loader2 } from "lucide-react";
import { motion } from "motion/react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10">
      <motion.div className="flex items-center space-x-2 text-shop_light_green">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>Loading...</span>
      </motion.div>
    </div>
  );
};

export default Loading;
