import { useState } from "react";
import PriceFormatter from "../PriceFormatter";
import { Title } from "../ui/text";

interface PriceRangeProps {
  onPriceRangeChange: (value: number[]) => void;
}

const PriceRange = ({ onPriceRangeChange }: PriceRangeProps) => {
  const [value, setValue] = useState<number[]>([0, 10000000]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(e.target.value);

    const updatedValue = [0, newMax];
    setValue(updatedValue);
    onPriceRangeChange(updatedValue);
  };

  return (
    <div className="w-full bg-white p-5">
      <Title className="text-base">Giá</Title>

      <div className="space-y-2">
        <input
          type="range"
          min={0}
          max={10000000}
          value={value[1]}
          onChange={handleChange}
          className="w-full"
        />

        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            <PriceFormatter amount={value[0]} />
          </span>
          <span>
            <PriceFormatter amount={value[1]} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
