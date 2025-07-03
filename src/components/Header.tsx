import { Link } from "react-router-dom";
import NavLink from "@/components/NavLink";
import type { NavLinks } from "@/constants/navLinks";

interface HeaderProps {
  navLinks: NavLinks[];
}

export default function Header({ navLinks }: HeaderProps) {
  return (
    <header className="w-full bg-deep-brown py-4 px-6 flex items-center justify-between shadow-lg">
      <Link
        to="/dashboard"
        className="text-3xl font-serif text-amber-gold font-bold tracking-wide whitespace-nowrap"
      >
        Whiskey App
      </Link>
      <nav className="flex space-x-6">
        {navLinks.map((link) => (
          <NavLink key={link.to} to={link.to} icon={link.icon} text={link.text} />
        ))}
      </nav>
    </header>
  );
}
