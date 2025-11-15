import { useState } from "react";
import { Title } from "../ui/text";
import { StarIcon } from "lucide-react";

const Rating = () => {
  const [selectedRating, setSelectedRating] = useState(0);

  return (
    <div className="w-full bg-white p-5 space-y-1">
      <Title className="text-base">Xếp hạng</Title>
      <div className="space-y-1">
        {[5, 4, 3, 2, 1].map((rating) => {
          return (
            <button
              key={rating}
              onClick={() =>
                setSelectedRating(selectedRating === rating ? 0 : rating)
              }
              className={`flex items-center space-x-3 w-full p-2 rounded ${
                selectedRating === rating
                  ? "bg-gray-200"
                  : "hover:bg-shop_light_bg"
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
          );
        })}
      </div>
    </div>
  );
};

export default Rating;
