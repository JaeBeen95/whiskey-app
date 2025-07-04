import Input from "@/components/Input";
import type { UseFormRegisterReturn } from "react-hook-form";

type FormFieldElementProps =
  | (Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
      type?: "text" | "password" | "email" | "number" | string;
    })
  | (Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "type"> & { type: "textarea" });

export type FormFieldInputProps = UseFormRegisterReturn &
  FormFieldElementProps & {
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

  return (
    <div className={`mb-6 ${className || ""}`}>
      <label htmlFor={inputProps.name} className="block text-sm font-bold text-gold-500 mb-2">
        {label}
      </label>

      {type === "textarea" ? (
        <div className="relative w-full">
          {icon && (
            <span className="absolute top-3 left-3 pointer-events-none text-light-gray-50/60">
              {icon}
            </span>
          )}
          <textarea
            id={inputProps.name}
            className={`w-full bg-deep-navy-900 border text-light-gray-50 placeholder-light-gray-50/50 rounded-lg py-3 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors duration-200 ${icon ? "pl-10" : "pl-4"} ${endIcon ? "pr-10" : "pr-4"} ${error ? "border-red-500" : "border-gold-500/40"}`}
            rows={4}
            {...(restInputProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            ref={inputProps.ref as React.Ref<HTMLTextAreaElement>}
          />
          {endIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">{endIcon}</div>
          )}
        </div>
      ) : (
        <Input
          id={inputProps.name}
          icon={icon}
          endIcon={endIcon}
          hasError={!!error}
          {...(restInputProps as React.InputHTMLAttributes<HTMLInputElement>)}
          type={type}
          ref={inputProps.ref as React.Ref<HTMLInputElement>}
        />
      )}

      {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
    </div>
  );
}
