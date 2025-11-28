import { twMerge } from "tailwind-merge";

interface Props {
  amount: number | undefined;
  className?: string;
}

const PriceFormatter = ({ amount, className }: Props) => {
  if (!amount)
    return (
      <span
        className={twMerge("text-sm font-semibold text-darkColor", className)}
      >
        0₫
      </span>
    );

  // Nhân với 1000 để thêm 3 số 0
  const formattedPrice = (amount * 1000).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });

  return (
    <span
      className={twMerge("text-sm font-semibold text-darkColor", className)}
    >
      {formattedPrice}
    </span>
  );
};

export default PriceFormatter;
