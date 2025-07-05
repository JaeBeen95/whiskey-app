interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "ref"> {
  type?: "text" | "password" | "email" | "number" | string;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  hasError?: boolean;
  ref: React.Ref<HTMLInputElement>;
}

export default function Input({
  icon,
  endIcon,
  hasError = false,
  className,
  ...props
}: InputProps) {
  const baseClasses =
    "w-full bg-deep-navy-900 border text-light-gray-50 placeholder-light-gray-50/50 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors duration-200";
  const startIconPadding = icon ? "pl-10" : "pl-4";
  const endIconPadding = endIcon ? "pr-10" : "pr-4";
  const errorBorderClass = hasError ? "border-red-500" : "border-gold-500/40";
  const inputClassName = `${baseClasses} ${startIconPadding} ${endIconPadding} ${errorBorderClass} ${className || ""}`;

  return (
    <div className="relative w-full">
      {icon && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-light-gray-50/60">
          {icon}
        </span>
      )}
      <input className={inputClassName} {...props} />
      {endIcon && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">{endIcon}</div>
      )}
    </div>
  );
}
