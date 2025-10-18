import { Pill } from "lucide-react";
import logoImage from "@/assets/pharmfind-logo.png";

const Logo = ({ size = "default" }: { size?: "default" | "small" }) => {
  const sizeClasses = {
    default: "w-48 h-12",
    small: "w-36 h-9"
  };

  return (
    <div className={`${sizeClasses[size]}`}>
      <img src={logoImage} alt="PharmFind Logo" className="w-full h-full object-contain" />
    </div>
  );
};

export default Logo;
