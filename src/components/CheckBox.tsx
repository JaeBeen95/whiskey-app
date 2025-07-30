interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "ref"> {
  label: string;
  ref: React.Ref<HTMLInputElement>;
}
export default function Checkbox({ label, ...props }: CheckboxProps) {
  const { ref, ...restProps } = props;
  return (
    <label className="flex items-center space-x-3 cursor-pointer">
      <input
        {...restProps}
        type="checkbox"
        ref={ref}
        className="h-4 w-4 rounded text-gold-500 border-gold-500/30 focus:ring-gold-500 bg-dark-gray-700"
      />
      <span className="text-light-gray-50">{label}</span>
    </label>
  );
}
