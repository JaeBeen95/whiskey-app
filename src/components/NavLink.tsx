import { Link } from "react-router-dom";

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
}

export default function NavLink({ to, icon, text }: NavLinkProps) {
  return (
    <Link
      to={to}
      className="flex items-center px-4 py-3 rounded-lg text-cream-ivory hover:bg-amber-dark transition-colors duration-200 font-sans font-medium text-lg whitespace-nowrap"
    >
      {icon}
      <span className="ml-3">{text}</span>
    </Link>
  );
}
