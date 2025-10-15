import { Pill } from "lucide-react";
import logoImage from "@/assets/pharmfind-logo.png";

const Logo = ({ showText = true, size = "default" }: { showText?: boolean; size?: "default" | "small" }) => {
  const sizeClasses = {
    default: "w-10 h-10",
    small: "w-8 h-8"
  };

  const textSizeClasses = {
    default: "text-2xl",
    small: "text-xl"
  };

  return (
    <div className="flex items-center gap-3">
      <div className={`${sizeClasses[size]} rounded-xl overflow-hidden bg-primary/10 p-1.5 ring-2 ring-primary/20`}>
        <img src={logoImage} alt="PharmFind Logo" className="w-full h-full object-contain" />
      </div>
      {showText && (
        <span className={`${textSizeClasses[size]} font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent`}>
          PharmFind
        </span>
      )}
    </div>
  );
};

export default Logo;
