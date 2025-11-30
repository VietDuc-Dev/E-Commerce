import { useModal } from "@/context/ModalContext";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { Link } from "react-router";
import DateVN from "@/lib/date";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import PriceFormatter from "@/lib/price";
import { STATUS_LABELS } from "@/enum/statusOrder";

export default function DetailOrderModal() {
  const { isModalDetailOrder, closeModalDetailOrder, order } = useModal();

  if (!order) return null;

  return (
    <Modal
      isOpen={isModalDetailOrder}
      onClose={closeModalDetailOrder}
      className="max-w-[800px] m-4"
    >
      <div className="w-full max-w-[800px] bg-white p-4 rounded-3xl dark:bg-gray-900 lg:p-11">
        <h4 className="text-2xl font-semibold mb-4">Đơn hàng : {order.id}</h4>

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
            {order.created_at && <DateVN value={order.created_at} />}
          </p>
          <p>
            <strong>Trạng thái: </strong>{" "}
            <span className={`capitalize font-medium`}>
              {STATUS_LABELS[order.order_status]}
            </span>
          </p>
          <p>
            <strong>Ngày thanh toán:</strong>{" "}
            {order.paid_at && <DateVN value={order.paid_at} />}
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
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Sản phẩm
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Số lượng
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Đơn giá
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Tổng
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {order.order_items.map((product, index) => (
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
                  <PriceFormatter amount={product?.price} />
                </TableCell>
                <TableCell>
                  <PriceFormatter amount={product?.price * product?.quantity} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 text-right flex items-center justify-end">
          <div className="flex flex-col gap-1">
            <div className="w-full flex items-center justify-between gap-3">
              <strong>Thuế: </strong>
              {order.tax_price}
            </div>

            <div className="w-full flex items-center justify-between gap-3">
              <strong>Phí vận chuyển: </strong>
              <PriceFormatter amount={Number(order.shipping_price)} />
            </div>

            <div className="w-full flex items-center justify-between gap-3">
              <strong>Tổng hóa đơn: </strong>
              <PriceFormatter amount={Number(order.total_price)} />
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={closeModalDetailOrder}>
            Đóng
          </Button>
        </div>
      </div>
    </Modal>
  );
}
