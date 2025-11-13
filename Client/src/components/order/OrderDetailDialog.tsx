import type { OrderProp } from "@/store/order/orderTypes";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import PriceFormatter from "../PriceFormatter";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { STATUS_COLORS, STATUS_LABELS } from "@/constant/orderEnum";

interface OrderDetailsDialogProps {
  order: OrderProp | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailDialog: React.FC<OrderDetailsDialogProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  if (!order) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-4xl max-h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Đơn hàng - {order?.id}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p>
            <strong>Khách hàng: </strong> {order.shipping_info.full_name}
          </p>
          <p>
            <strong>Số điện thoại: </strong> {order.shipping_info.phone}
          </p>
          <p>
            <strong>Địa chỉ: </strong> {order.shipping_info.addressDetail},{" "}
            {order.shipping_info.ward}, {order.shipping_info.district},{" "}
            {order.shipping_info.city}
          </p>
          <p>
            <strong>Ngày đặt: </strong>{" "}
            {order?.created_at &&
              format(new Date(order.created_at), "dd/MM/yyyy")}
          </p>
          <p>
            <strong>Trạng thái: </strong>{" "}
            <span
              className={`capitalize ${
                STATUS_COLORS[order.order_status]
              } font-medium`}
            >
              {STATUS_LABELS[order.order_status] ?? "Không xác định"}
            </span>
          </p>
          <p>
            <strong>Ngày thanh toán:</strong>{" "}
            {order?.paid_at && format(new Date(order.paid_at), "dd/MM/yyyy")}
          </p>

          <Button className="bg-transparent border text-darkColor/80 mt-2 hover:text-darkColor hover:border-darkColor hover:bg-darkColor/10 hoverEffect ">
            <Link to={""} target="_blank">
              Tải hóa đơn
            </Link>
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sản phẩm</TableHead>
              <TableHead>Số lượng</TableHead>
              <TableHead>Đơn giá</TableHead>
              <TableHead>Tổng</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order?.order_items.map((product, index) => (
              <TableRow key={index}>
                <TableCell className="flex items-center gap-3">
                  {product?.image && (
                    <img
                      src={product?.image[0]}
                      alt="productImage"
                      width={50}
                      height={50}
                      className="border rounded-sm"
                    />
                  )}

                  <span>{product?.title}</span>
                </TableCell>
                <TableCell>{product?.quantity}</TableCell>
                <TableCell>
                  <PriceFormatter
                    amount={product?.price}
                    className="text-black font-medium"
                  />
                </TableCell>
                <TableCell>
                  <PriceFormatter
                    amount={product?.price * product?.quantity}
                    className="text-black font-medium"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 text-right flex items-center justify-end">
          <div className="flex flex-col gap-1">
            <div className="w-full flex items-center justify-between gap-3">
              <strong>Thuế: </strong>
              {order?.tax_price}
            </div>

            <div className="w-full flex items-center justify-between gap-3">
              <strong>Phí vận chuyển: </strong>
              <PriceFormatter
                amount={Number(order?.shipping_price)}
                className="text-black font-normal"
              />
            </div>

            <div className="w-full flex items-center justify-between gap-3">
              <strong>Tổng hóa đơn: </strong>
              <PriceFormatter
                amount={Number(order?.total_price)}
                className="text-black font-bold"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailDialog;
