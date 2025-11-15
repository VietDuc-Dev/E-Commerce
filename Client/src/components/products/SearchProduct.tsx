import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";

interface SearchProductsProps {
  onSearchChange: (value: string) => void;
}

const SearchProducts = ({ onSearchChange }: SearchProductsProps) => {
  const [value, setValue] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearchChange(value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 space-x-2">
      <div className="relative w-full">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </span>

        <Input
          type="text"
          placeholder="Tìm kiếm sản phẩm ..."
          className="pl-10"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </form>
  );
};

export default SearchProducts;
