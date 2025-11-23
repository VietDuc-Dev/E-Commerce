import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-start justify-center mt-20">
      <div className="flex items-center space-x-2">
        <Loader size="25px" className="animate-spin" />
        <span className="text-sm font-medium">Dashboard...</span>
      </div>
    </div>
  );
}
