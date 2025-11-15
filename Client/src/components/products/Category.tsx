import { useState } from "react";
import { Title } from "../ui/text";
import { categoriesData } from "@/constant/data";

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  return (
    <div className="w-full bg-white p-5 space-y-1">
      <Title className="text-base">Danh mục sản phẩm</Title>
      <div className="space-y-2">
        <button
          onClick={() => setSelectedCategory("")}
          className={`w-full p-2 text-left rounded ${
            !selectedCategory ? "bg-gray-200" : "hover:bg-shop_light_bg"
          }`}
        >
          Tất cả sản phẩm
        </button>
        {categoriesData.map((category) => (
          <button
            key={category.title}
            onClick={() => setSelectedCategory(category.title)}
            className={`w-full p-2 text-left rounded ${
              selectedCategory === category.title
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
