import { useState } from "react";
import PriceFormatter from "../PriceFormatter";
import { Title } from "../ui/text";

const PriceRange = () => {
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  return (
    <div className="w-full bg-white p-5">
      <Title className="text-base">Giá</Title>
      <div className="space-y-2">
        <input
          type="range"
          min="0"
          max="10000000"
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], parseInt(e.target.value)])
          }
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            <PriceFormatter amount={priceRange[0]} />
          </span>
          <span>
            <PriceFormatter amount={priceRange[1]} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
