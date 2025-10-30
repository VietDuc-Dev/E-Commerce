import { cn } from "@/lib/utils";
import PriceFormatter from "./PriceFormatter";

interface Props {
  price: number | undefined;
  className?: string;
}
const PriceView = ({ price, className }: Props) => {
  return (
    <div className="flex items-center justify-between gap-5">
      <div className="flex items-center gap-2">
        <PriceFormatter
          amount={price}
          className={cn("text-shop_dark_green", className)}
        />
      </div>
    </div>
  );
};

export default PriceView;
