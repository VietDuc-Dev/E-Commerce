import { useState } from "react";
import { Title } from "../ui/text";
import { productType } from "@/constant/data";

interface CategoryProps {
  onCategoryChange: (value: string) => void;
}

const Category = ({ onCategoryChange }: CategoryProps) => {
  const [value, setValue] = useState<string>("");

  const handleCategoryClick = (category: string) => {
    console.log(category);

    setValue(category);
    onCategoryChange(category);
  };

  return (
    <div className="w-full bg-white p-5 space-y-1">
      <Title className="text-base">Danh mục sản phẩm</Title>

      <div className="space-y-2">
        <button
          onClick={() => handleCategoryClick("")}
          className={`w-full p-2 text-left rounded ${
            !value ? "bg-gray-200" : "hover:bg-shop_light_bg"
          }`}
        >
          Tất cả sản phẩm
        </button>

        {productType.map((category) => (
          <button
            key={category.title}
            onClick={() => handleCategoryClick(category.value)}
            className={`w-full p-2 text-left rounded ${
              value === category.value
                ? "bg-gray-200"
                : "hover:bg-shop_light_bg"
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;
