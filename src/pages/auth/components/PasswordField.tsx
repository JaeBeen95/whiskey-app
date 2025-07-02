import { useState } from "react";
import { EyeIcon, EyeSlashIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import FormField from "@/components/FormField";

interface PasswordFieldProps {
  id: string;
  label: string;
  error?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export default function PasswordField({ id, label, error, inputProps }: PasswordFieldProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <FormField
        id={id}
        label={label}
        icon={<LockClosedIcon className="h-5 w-5" />}
        error={error}
        inputProps={{
          ...inputProps,
          type: show ? "text" : "password",
        }}
      />
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-light-gray-50/70 hover:text-gold-500 focus:outline-none cursor-pointer"
        tabIndex={-1}
      >
        {show ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
      </button>
    </div>
  );
}
