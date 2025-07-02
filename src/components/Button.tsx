type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  icon,
  disabled = false,
}: ButtonProps) {
  const baseStyle =
    "w-full font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline shadow-lg flex items-center justify-center transition-all duration-300 transform will-change-transform backface-visibility-hidden";

  const getVariantStyle = (buttonVariant: ButtonVariant) => {
    switch (buttonVariant) {
      case "primary":
        return "bg-gold-500 text-deep-navy-900";
      case "secondary":
        return "bg-gold-600 text-deep-navy-900";
      case "danger":
        return "bg-red-700 text-white";
      default:
        return "bg-gold-500 text-deep-navy-900";
    }
  };

  const getHoverStyle = (buttonVariant: ButtonVariant) => {
    switch (buttonVariant) {
      case "primary":
        return "hover:brightness-110 hover:scale-105 hover:shadow-xl";
      case "secondary":
        return "hover:bg-gold-500 hover:scale-105 hover:shadow-xl";
      case "danger":
        return "hover:bg-red-800 hover:scale-105 hover:shadow-xl";
      default:
        return "hover:brightness-110 hover:scale-105 hover:shadow-xl";
    }
  };

  const variantStyle = getVariantStyle(variant);
  const hoverStyle = !disabled ? getHoverStyle(variant) : "";

  const disabledStyle = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variantStyle} ${hoverStyle} ${disabledStyle} ${className}`}
      disabled={disabled}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}
