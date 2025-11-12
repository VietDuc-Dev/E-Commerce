import PriceFormatter from "../PriceFormatter";
import { format } from "date-fns";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { STATUS_COLORS, STATUS_LABELS } from "@/constant/orderEnum";
import type { OrderProp } from "@/store/order/orderTypes";

interface OrdersComponentProps {
  orders: OrderProp[];
}

const OrdersComponent = ({ orders }: OrdersComponentProps) => {
  return (
    <div className="space-y-3 ">
      {orders.map((order) => (
        <div key={order.id} className="p-6 bg-white border">
          {/* Order header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
            <div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-lg font-semibold from-foreground mb-1">
                    Đơn hàng #{order?.id}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Xem chi tiết đơn hàng</p>
                </TooltipContent>
              </Tooltip>
              <p className="text-muted-foreground">
                Ngày đặt:{" "}
                {order?.created_at &&
                  format(new Date(order.created_at), "dd/MM/yyyy")}
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <p className="text-sm text-muted-foreground">Trạng thái: </p>
                {order?.order_status && (
                  <>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        STATUS_COLORS[order.order_status] ??
                        "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {STATUS_LABELS[order.order_status] ?? "Không xác định"}
                    </span>
                  </>
                )}
              </div>
              <div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Tổng</p>
                  <p className="text-xl font-bold text-primary">
                    <PriceFormatter amount={Number(order?.total_price)} />
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Order items */}
          <div className="space-y-4">
            {order?.order_items?.map((item) => (
              <div className="flex items-center justify-between space-x-4 p-4 bg-secondary/50 rounded-lg">
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="min-w-0">
                    <h4 className="font-medium text-foreground truncate">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Số lượng: {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-muted-foreground">Đơn giá:</p>
                  <p className="font-semibold text-foreground">
                    <PriceFormatter amount={Number(item.price)} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersComponent;
