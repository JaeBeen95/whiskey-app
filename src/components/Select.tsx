import { ChevronDownIcon } from "@heroicons/react/24/outline";

type SelectElementProps = React.SelectHTMLAttributes<HTMLSelectElement>;

interface SelectProps extends SelectElementProps {
  icon?: React.ReactNode;
  hasError?: boolean;
  className?: string;
  ref: React.Ref<HTMLSelectElement>;
  children: React.ReactNode;
}

export default function Select({
  icon,
  hasError = false,
  className,
  children,
  ...props
}: SelectProps) {
  const baseClasses =
    "w-full appearance-none bg-deep-navy-900 border text-light-gray-50 rounded-lg py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors duration-200";

  const startIconPadding = icon ? "pl-10" : "pl-4";
  const errorBorderClass = hasError ? "border-red-500" : "border-gold-500/40";

  const selectClassName = `${baseClasses} ${startIconPadding} ${errorBorderClass} ${className || ""}`;

  return (
    <div className="relative w-full">
      {icon && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-light-gray-50/60">
          {icon}
        </span>
      )}
      <select className={selectClassName} {...props} ref={props.ref}>
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-light-gray-50">
        <ChevronDownIcon className="h-5 w-5" />
      </div>
    </div>
  );
}
