interface AuthInputProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  autocomplete?: string;
}

export default function AuthInput({
  id,
  label,
  type,
  placeholder,
  icon,
  autocomplete,
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
        className="shadow-inner appearance-none border border-gold-500/50 rounded-lg w-full py-3 px-4 text-light-gray-50 bg-deep-navy-900 leading-tight focus:outline-none focus:ring-2 focus:ring-accent-orange-500 focus:border-transparent transition-all duration-200 placeholder-light-gray-50/50"
        placeholder={placeholder}
        autoComplete={autocomplete}
      />
    </div>
  );
}
