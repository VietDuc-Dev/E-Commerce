import { AvailabilityEnum } from "@/constant";
import { Title } from "../ui/text";
import { useState } from "react";

interface AvailabilityProps {
  onAvailabilityChange: (value: string) => void;
}

const Availability = ({ onAvailabilityChange }: AvailabilityProps) => {
  const [value, setValue] = useState("");

  const Stock = [...Object.values(AvailabilityEnum)] as const;

  const handleAvailabilityClick = (status: string) => {
    const newValue = value === status ? "" : status;
    setValue(newValue);
    onAvailabilityChange(newValue);
  };

  return (
    <div className="w-full bg-white p-5 space-y-1">
      <Title className="text-base">Kho</Title>

      <div className="space-y-2">
        {Stock.map((status) => (
          <button
            key={status}
            onClick={() => handleAvailabilityClick(status)}
            className={`w-full p-2 text-left rounded ${
              value === status ? "bg-gray-200" : "hover:bg-shop_light_bg"
            }`}
          >
            {status === AvailabilityEnum.IN_STOCK
              ? "Sản phẩm luôn có"
              : status === AvailabilityEnum.LIMITED
              ? "Số lượng ít"
              : "Hết hàng"}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Availability;
