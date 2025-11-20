import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CartEmpty = () => {
  return (
    <div className="pt-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 w-full space-y-8"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
          }}
          className="relative w-48 h-48 mx-auto"
        >
          <img
            src="https://www.nhonmy.com/wp-content/uploads/2018/09/shopping_cart.jpg"
            alt="Empty shopping cart"
            className="drop-shadow-lg"
          />
          <motion.div
            animate={{
              x: [0, -10, 10, 0],
              y: [0, -5, 5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "linear",
            }}
            className="absolute -top-4 -right-4 bg-blue-500 rounded-full p-2"
          >
            <ShoppingCart size={24} className="text-white" />
          </motion.div>
        </motion.div>

        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Giỏi hàng của bạn hiện chưa có sản phẩm nào
          </h2>
          <p className="text-gray-600">
            Có vẻ như bạn chưa thêm bất cứ thứ gì vào giỏ hàng của mình. Hãy
            thay đổi điều đó và tìm một số sản phẩm tuyệt vời cho bạn!
          </p>
        </div>

        <div className="flex justify-center">
          <Link
            to="/products"
            className="w-1/3 block bg-darkColor/5 border border-darkColor/20 text-center py-2.5 rounded-full text-sm font-semibold tracking-wide hover:border-darkColor hover:bg-darkColor hover:text-white hoverEffect"
          >
            Xem thêm sản phẩm
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default CartEmpty;
