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
    "w-full font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline shadow-lg flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl will-change-transform backface-visibility-hidden";

  const getVariantStyle = (variant: ButtonVariant) => {
    switch (variant) {
      case "primary":
        return "bg-gold-500 text-deep-navy-900 hover:brightness-110";
      case "secondary":
        return "bg-gold-600 text-deep-navy-900 hover:bg-gold-500";
      case "danger":
        return "bg-red-700 text-white hover:bg-red-800";
      default:
        return "bg-gold-500 text-deep-navy-900 hover:brightness-110";
    }
  };

  const variantStyle = getVariantStyle(variant);

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variantStyle} ${className}`}
      disabled={disabled}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}
