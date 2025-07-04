import { useState } from "react";
import { EyeIcon, EyeSlashIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import FormField from "@/components/FormField";
import type { UseFormRegisterReturn } from "react-hook-form";

interface PasswordFieldProps {
  label: string;
  error?: string;
  inputProps: UseFormRegisterReturn &
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
      ref: React.Ref<HTMLInputElement>;
    };
  className?: string;
}

export default function PasswordField({ label, error, inputProps, className }: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      className={className}
      label={label}
      icon={<LockClosedIcon className="h-5 w-5" />}
      error={error}
      inputProps={{
        ...inputProps,
        type: showPassword ? "text" : "password",
      }}
      endIcon={
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="text-light-gray-50/70 hover:text-gold-500 focus:outline-none cursor-pointer"
          aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
          tabIndex={-1}
        >
          {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
        </button>
      }
    />
  );
}
