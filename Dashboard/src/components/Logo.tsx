import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface Props {
  className?: string;
  spanDesign?: string;
}

const Logo = ({ className, spanDesign }: Props) => {
  return (
    <Link to="/dashboard/home" className="inline-flex">
      <h2
        className={cn(
          "text-2xl font-black tracking-wider uppercase",
          className
        )}
      >
        Shop <span className={cn("", spanDesign)}>Connect+</span>
      </h2>
    </Link>
  );
};

export default Logo;
