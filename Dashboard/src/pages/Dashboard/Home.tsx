import { OrderStatusCounts } from "@/components/ecommerce/OrderStatusCounts";
import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import TopProduct from "../../components/ecommerce/TopProduct";
import { MonthlySales } from "@/components/ecommerce/MonthlySales";
import { ChartBarDefault } from "@/components/ecommerce/ChartBar";
import useGetDashboard from "@/hooks/api/use-get-dashboard";

export default function Home() {
  const { data, isLoading } = useGetDashboard();

  if (isLoading) return <>Loading...</>;

  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <EcommerceMetrics
            TodayRevenue={data?.todayRevenue}
            TotalUser={data?.totalUsersCount}
            AllTimeRevenue={data?.totalRevenueAllTime}
          />
        </div>

        <div className="col-span-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
            <MonthlySales monthlySales={data?.monthlySales} />
            <OrderStatusCounts orderStatusCounts={data?.orderStatusCounts} />
            <ChartBarDefault
              topSellingProducts={data?.topSellingProducts}
              lowStockProducts={data?.lowStockProducts}
              revenueGrowth={data?.revenueGrowth}
              newUsersThisMonth={data?.newUsersThisMonth}
              currentMonthSales={data?.currentMonthSales}
              orderStatusCounts={data?.orderStatusCounts}
            />
          </div>
        </div>

        <div className="col-span-12">
          <TopProduct TopProduct={data?.topSellingProducts} />
        </div>
      </div>
    </>
  );
}
