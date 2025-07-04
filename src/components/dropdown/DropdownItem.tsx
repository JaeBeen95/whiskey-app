interface DropdownItemProps {
  children: React.ReactNode;
  onClick: () => void;
  icon?: React.ReactNode;
}

export default function DropdownItem({ children, onClick, icon }: DropdownItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-light-gray-50 hover:bg-deep-navy-900/50 cursor-pointer"
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      {children}
    </button>
  );
}
