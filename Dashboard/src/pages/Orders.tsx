import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import TableOrders from "@/components/Orders/TableOrders";

export default function Orders() {
  return (
    <>
      <PageBreadcrumb pageTitle="Đơn hàng" />
      <TableOrders />
    </>
  );
}
