import { AvailabilityEnum } from "@/constant";
import { Title } from "../ui/text";
import { useState } from "react";

const Availability = () => {
  const [availability, setAvailability] = useState("");
  const Stock = [...Object.values(AvailabilityEnum)] as const;
  return (
    <div className="w-full bg-white p-5 space-y-1">
      <Title className="text-base">Kho</Title>
      <div className="space-y-2">
        {[
          Stock.map((status) => {
            return (
              <button
                key={status}
                onClick={() =>
                  setAvailability(availability === status ? "" : status)
                }
                className={`w-full p-2 text-left rounded ${
                  availability === status
                    ? "bg-gray-200"
                    : "hover:bg-shop_light_bg"
                }`}
              >
                {status === AvailabilityEnum.IN_STOCK
                  ? "Sản phẩm có luôn có"
                  : status === AvailabilityEnum.LIMITED
                  ? "Số lượng ít"
                  : "Hết hàng"}
              </button>
            );
          }),
        ]}
      </div>
    </div>
  );
};

export default Availability;
