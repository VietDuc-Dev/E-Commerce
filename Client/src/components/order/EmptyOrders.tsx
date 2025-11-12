import { FileX } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const EmptyOrders = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <FileX className="h-24 w-24 text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-900">Đơn hàng trống</h2>
      <p className="mt-2 text-sm text-gray-600 text-center max-w-md">
        Có vẻ như bạn chưa đặt bất kỳ đơn đặt hàng nào. Bắt đầu mua sắm để xem
        đơn đặt hàng của bạn ở đây!
      </p>
      <Button asChild className="mt-6">
        <Link to="/shop">Xem thêm sản phẩm</Link>
      </Button>
    </div>
  );
};
export default EmptyOrders;
