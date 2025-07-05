interface FormFieldProps {
  label: string;
  error?: string;
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}

export default function FormField({ label, error, children, htmlFor, className }: FormFieldProps) {
  return (
    <div className={`mb-4 ${className || ""}`}>
      <label htmlFor={htmlFor} className="block text-sm font-bold text-gold-500 mb-2">
        {label}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
    </div>
  );
}
