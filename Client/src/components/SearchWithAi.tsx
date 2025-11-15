import { Search, Sparkles } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

interface SearchWithAIProps {
  onSearchChange: (value: string) => void;
}

const SearchWithAI = ({ onSearchChange }: SearchWithAIProps) => {
  const [value, setValue] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearchChange(value);
  };

  return (
    <div className="flex flex-1 space-x-2">
      <form onSubmit={handleSubmit} className="flex flex-1 space-x-2">
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </span>

          <Input
            type="text"
            placeholder="Tìm nhanh với trợ lý AI"
            className="pl-10"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          className="flex items-center gap-2 bg-gradient-to-br from-green-400 to-blue-600 hover:opacity-90 text-white"
        >
          <Sparkles className="size-4" />
          Tìm ngay
        </Button>
      </form>
    </div>
  );
};

export default SearchWithAI;
