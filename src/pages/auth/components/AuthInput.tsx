import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

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
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";

  const inputType = isPasswordType && showPassword ? "text" : type;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="mb-6">
      <label htmlFor={id} className="text-gold-500 text-sm font-bold mb-2 flex items-center">
        {icon}
        {label}
      </label>
      <div className="relative">
        <input
          type={inputType}
          id={id}
          name={id}
          className={`shadow-inner appearance-none border rounded-lg w-full py-3 px-4 text-light-gray-50 bg-deep-navy-900 leading-tight focus:outline-none focus:ring-2 focus:ring-accent-orange-500 focus:border-transparent transition-all duration-200 placeholder-light-gray-50/50 ${
            error ? "border-red-500" : "border-gold-500/50"
          }`}
          placeholder={placeholder}
          autoComplete={autocomplete}
          {...registerProps}
        />
        {isPasswordType && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-light-gray-50/70 hover:text-gold-500 focus:outline-none cursor-pointer"
            aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
          >
            {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        )}
      </div>
      <p className={`text-xs mt-1 ${error ? "text-red-500" : "text-transparent"}`}>
        {error || " "}
      </p>
    </div>
  );
}
