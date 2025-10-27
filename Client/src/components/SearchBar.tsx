import { Search } from "lucide-react";
import { Input } from "./ui/input";

const SearchBar = () => {
  return (
    <div className="flex">
      <Search className="w-5 h-5 hover:text-shop_light_green hoverEffect lg:hidden" />

      <div className="rounded-l-full border border-r-0 w-13 relative hidden lg:inline-flex">
        <Search className="w-5 h-5 hover:text-shop_light_green hoverEffect absolute top-1.5 right-2" />
      </div>
      <Input
        className="rounded-r-full hidden lg:inline-flex"
        placeholder="Tìm nhanh với trợ lý AI"
      />
    </div>
  );
};

export default SearchBar;
