import { TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LowStockProduct, TopSellingProductUI } from "@/types/api.type";
import { OrderStatusEnumType } from "@/enum/statusOrder";

export const description = "A bar chart";

interface Props {
  topSellingProducts?: TopSellingProductUI[];
  lowStockProducts?: LowStockProduct[];
  revenueGrowth?: number;
  newUsersThisMonth?: number;
  currentMonthSales?: number;
  orderStatusCounts?: Record<OrderStatusEnumType, number>;
}

export function ChartBarDefault({
  topSellingProducts = [],
  lowStockProducts = [],
  revenueGrowth = 0,
  newUsersThisMonth = 0,
  currentMonthSales = 0,
  orderStatusCounts = {} as Record<OrderStatusEnumType, number>,
}: Props) {
  let totalOrder: number = 0;
  totalOrder = Object.values(orderStatusCounts).reduce(
    (acc, count) => acc + count,
    0
  );

  const summary = [
    {
      text: "Tổng thu nhập của tháng",
      subtext: `Doanh thu tháng này : ${currentMonthSales}`,
    },
    {
      text: "Tổng đơn đặt hàng",
      subtext: `Tổng đơn : ${totalOrder}`,
    },
    {
      text: "Sản phẩm bán chạy",
      subtext:
        topSellingProducts.length > 0
          ? `Sản phẩm: ${topSellingProducts[0].name} - Đã bán ${topSellingProducts[0].total_sold} sản phẩm`
          : "Chưa có dữ liệu",
    },
    {
      text: "Cảnh báo số lượng sản phẩm thấp",
      subtext: `Có ${lowStockProducts.length} sản phẩm có số lượng thấp`,
    },
    {
      text: "Tỷ lệ thu nhập",
      subtext: `Doanh thu ${revenueGrowth >= 0 ? "tăng" : "giảm"} ${Math.abs(
        revenueGrowth
      )}% so với tháng trước`,
    },
    {
      text: "Khách hàng mới",
      subtext: `Lượng khách hàng mới tham gia: ${newUsersThisMonth}`,
    },
  ];
  return (
    <Card className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <CardHeader>
        <CardTitle>Tóm tắt</CardTitle>
        <CardDescription>Tóm tắt mục quạn trọng tháng hiện tại</CardDescription>
      </CardHeader>
      <CardContent className="flex-col items-start gap-2 space-y-3 text-sm">
        {summary.map((item, index) => {
          return (
            <div key={index}>
              <div className="flex gap-2 leading-none font-medium">
                {item.text} <TrendingUp className="h-4 w-4" />
              </div>
              <div className="text-muted-foreground leading-none">
                {item.subtext}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
