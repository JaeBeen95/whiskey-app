type InputElementProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  type?: "text" | "password" | "email" | "number" | string;
};

export interface InputProps extends InputElementProps {
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  hasError?: boolean;
  inputClassName?: string;
  ref: React.Ref<HTMLInputElement>;
}

export default function Input({
  icon,
  endIcon,
  hasError = false,
  inputClassName,
  ...props
}: InputProps) {
  const { type = "text", ...restProps } = props;

  const baseClasses =
    "w-full bg-deep-navy-900 border text-light-gray-50 placeholder-light-gray-50/50 rounded-lg py-3 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors duration-200";

  const startIconPadding = icon ? "pl-10" : "pl-4";
  const endIconPadding = endIcon ? "pr-10" : "pr-4";
  const errorBorderClass = hasError ? "border-red-500" : "border-gold-500/40";

  const finalClassName = `${baseClasses} ${startIconPadding} ${endIconPadding} ${errorBorderClass} ${inputClassName || ""}`;

  return (
    <div className="relative w-full">
      {icon && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-light-gray-50/60">
          {icon}
        </span>
      )}
      <input type={type} className={finalClassName} {...restProps} ref={props.ref} />
      {endIcon && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">{endIcon}</div>
      )}
    </div>
  );
}
