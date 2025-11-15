import { useState } from "react";
import { Title } from "../ui/text";
import { StarIcon } from "lucide-react";

interface RatingProps {
  onRatingChange: (value: number) => void;
}

const Rating = ({ onRatingChange }: RatingProps) => {
  const [value, setValue] = useState<number>(0);

  const handleRatingClick = (rating: number) => {
    const newValue = value === rating ? 0 : rating;
    setValue(newValue);
    onRatingChange(newValue);
  };

  return (
    <div className="w-full bg-white p-5 space-y-1">
      <Title className="text-base">Xếp hạng</Title>

      <div className="space-y-1">
        {[5, 4, 3, 2, 1].map((rating) => (
          <button
            key={rating}
            onClick={() => handleRatingClick(rating)}
            className={`flex items-center space-x-3 w-full p-2 rounded ${
              value === rating ? "bg-gray-200" : "hover:bg-shop_light_bg"
            }`}
          >
            {[...Array(5)].map((_, index) => (
              <StarIcon
                size={13}
                key={index}
                className={
                  index < rating ? "text-shop_light_green" : " text-lightText"
                }
                fill={index < rating ? "#93D991" : "#ababab"}
              />
            ))}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Rating;
