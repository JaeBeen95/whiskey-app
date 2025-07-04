import type { UseFormRegisterReturn } from "react-hook-form";

type InputOrTextareaProps =
  | (Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
      type?: "text" | "password" | "email" | "number" | string;
    })
  | (Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "type"> & { type: "textarea" });

export type FormFieldInputProps = UseFormRegisterReturn &
  InputOrTextareaProps & {
    ref: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
  };

export interface FormFieldProps {
  label: string;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  error?: string;
  inputProps: FormFieldInputProps;
  className?: string;
}

export default function FormField({
  label,
  icon,
  endIcon,
  error,
  inputProps,
  className,
}: FormFieldProps) {
  const { type = "text", ...restInputProps } = inputProps;

  const baseClasses =
    "w-full bg-dark-gray-700/50 border text-light-gray-50 placeholder-light-gray-50/40 rounded-lg py-3 pr-3 focus:outline-none focus:ring-2 focus:ring-gold-500 transition-colors duration-200";
  const iconPaddingClass = icon ? "pl-10" : "pl-4";
  const errorBorderClass = error ? "border-red-500" : "border-gold-500/30";
  const inputClassName = `${baseClasses} ${iconPaddingClass} ${errorBorderClass}`;

  return (
    <div className={`mb-6 ${className || ""}`}>
      <label htmlFor={inputProps.name} className="block text-sm font-bold text-gold-500 mb-2">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-light-gray-50/60">
            {icon}
          </span>
        )}
        {type === "textarea" ? (
          <textarea
            id={inputProps.name}
            className={inputClassName}
            rows={4}
            {...(restInputProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            ref={inputProps.ref as React.Ref<HTMLTextAreaElement>}
          />
        ) : (
          <input
            id={inputProps.name}
            type={type}
            className={inputClassName}
            {...(restInputProps as React.InputHTMLAttributes<HTMLInputElement>)}
            ref={inputProps.ref as React.Ref<HTMLInputElement>}
          />
        )}

        {endIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">{endIcon}</div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
    </div>
  );
}
