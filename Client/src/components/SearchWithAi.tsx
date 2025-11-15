import { Search, Sparkles } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const SearchWithAI = () => {
  return (
    <div className="flex flex-1 space-x-2">
      <div className="relative w-full">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </span>
        <Input
          type="text"
          placeholder="Tìm nhanh với trợ lý AI"
          className="pl-10"
        />
      </div>

      <Button className="group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:ring-4 hover:outline-none hover:ring-green-200">
        <Sparkles className="size-4" />
        Tìm ngay
      </Button>
    </div>
  );
};

export default SearchWithAI;
