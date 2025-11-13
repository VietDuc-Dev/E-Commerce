import Container from "@/components/Container";
import EmptyOrders from "@/components/order/EmptyOrders";
import OrdersComponent from "@/components/order/OrdersComponent";
import { Title } from "@/components/ui/text";
import { OrderStatusEnum } from "@/constant";
import { STATUS_LABELS_FILTER } from "@/constant/orderEnum";
import { fetchMyOrders } from "@/store/order/orderThunks";
import type { AppDispatch, RootState } from "@/store/store";
import { Filter, Logs } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const OrderPage = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const { myOrders } = useSelector((state: RootState) => state.order);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const filterOrders = myOrders.filter(
    (order) => statusFilter === "All" || order.order_status === statusFilter
  );

  const ORDER_STATUS = ["All", ...Object.values(OrderStatusEnum)] as const;

  if (!myOrders.length) {
    return (
      <div className="bg-gray-50 pb-52 md:pb-10">
        <Container>
          <EmptyOrders />
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 pb-52 md:pb-10">
      <Container>
        <div className="flex items-center gap-2 py-5">
          <Logs className="text-darkColor" />
          <Title>Đơn hàng của bạn</Title>
        </div>

        <div className="p-4 mb-8 bg-white border rounded-2xl">
          <div className="flex items-center space-x-4 flex-wrap">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-primary" />
              <span className="font-medium">Lọc trạng thái sản phẩm: </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {ORDER_STATUS.map((status) => {
                return (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-4 py-0.5 rounded-lg font-medium transition-all hover:bg-shop_light_bg ${
                      statusFilter === status &&
                      "text-white bg-shop_light_green hover:bg-shop_light_green"
                    }`}
                  >
                    {STATUS_LABELS_FILTER[status]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <OrdersComponent orders={filterOrders} />
      </Container>
    </div>
  );
};

export default OrderPage;
