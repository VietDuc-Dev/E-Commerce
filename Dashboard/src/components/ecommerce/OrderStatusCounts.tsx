import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { OrderStatusEnumType } from "@/enum/statusOrder";

export const description = "A pie chart with a label";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "PROCESSING",
    color: "oklch(85.2% 0.199 91.936)",
  },
  safari: {
    label: "SHIPPED",
    color: "oklch(70.7% 0.165 254.624)",
  },
  firefox: {
    label: "DELIVERED",
    color: "oklch(79.2% 0.209 151.711)",
  },
  edge: {
    label: "CANCELLED",
    color: "oklch(70.4% 0.191 22.216)",
  },
} satisfies ChartConfig;

interface ChartPieLabelProps {
  orderStatusCounts?: Record<OrderStatusEnumType, number>;
}

export function OrderStatusCounts(orderStatusCounts: ChartPieLabelProps) {
  const chartData = [
    {
      browser: "PROCESSING",
      visitors: orderStatusCounts.orderStatusCounts?.PROCESSING ?? 0,
      fill: "var(--color-chrome)",
    },
    {
      browser: "SHIPPED",
      visitors: orderStatusCounts?.orderStatusCounts?.SHIPPED ?? 0,
      fill: "var(--color-safari)",
    },
    {
      browser: "DELIVERED",
      visitors: orderStatusCounts?.orderStatusCounts?.DELIVERED ?? 0,
      fill: "var(--color-firefox)",
    },
    {
      browser: "CANCELLED",
      visitors: orderStatusCounts?.orderStatusCounts?.CANCELLED ?? 0,
      fill: "var(--color-edge)",
    },
  ];

  return (
    <Card className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Trạng thái đơn hàng</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="visitors" label nameKey="browser" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {/* <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="text-muted-foreground leading-none">
          Hiển thị tổng số trạng thái trong 1 tháng qua
        </div>
      </CardFooter>
    </Card>
  );
}
