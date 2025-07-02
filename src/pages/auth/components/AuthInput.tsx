import type { UseFormRegisterReturn } from "react-hook-form";

interface AuthInputProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  autocomplete?: string;
  registerProps?: UseFormRegisterReturn;
  error?: string;
}

export default function AuthInput({
  id,
  label,
  type,
  placeholder,
  icon,
  autocomplete,
  registerProps,
  error,
}: AuthInputProps) {
  return (
    <div className="mb-6">
      <label htmlFor={id} className="text-gold-500 text-sm font-bold mb-2 flex items-center">
        {icon}
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        className={`shadow-inner appearance-none border rounded-lg w-full py-3 px-4 text-light-gray-50 bg-deep-navy-900 leading-tight focus:outline-none focus:ring-2 focus:ring-accent-orange-500 focus:border-transparent transition-all duration-200 placeholder-light-gray-50/50 ${
          error ? "border-red-500" : "border-gold-500/50"
        }`}
        placeholder={placeholder}
        autoComplete={autocomplete}
        {...registerProps}
      />
      <p className={`text-xs mt-1 ${error ? "text-red-500" : "text-transparent"}`}>
        {error || "placeholder"}
      </p>
    </div>
  );
}
