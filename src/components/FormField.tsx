import type { InputHTMLAttributes, ReactNode } from "react";

interface FormFieldProps {
  id: string;
  label: string;
  icon?: ReactNode;
  error?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

export default function FormField({ id, label, icon, error, inputProps }: FormFieldProps) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="text-gold-500 text-sm font-bold mb-2 flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </label>
      <div>
        <input
          id={id}
          name={id}
          className={`shadow-inner appearance-none border rounded-lg w-full py-3 px-4 text-light-gray-50 bg-deep-navy-900 leading-tight focus:outline-none focus:ring-2 focus:ring-accent-orange-500 focus:border-transparent transition-all duration-200 placeholder-light-gray-50/50 ${
            error ? "border-red-500" : "border-gold-500/50"
          } ${inputProps?.className || ""}`}
          {...inputProps}
        />
        <p className={`text-xs mt-1 ${error ? "text-red-500" : "text-transparent"} min-h-5`}>
          {error || " "}
        </p>
      </div>
    </div>
  );
}
