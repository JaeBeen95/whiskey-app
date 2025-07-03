import Header from "@/components/Header";
import type { NavLinks } from "@/constants/navLinks";

interface LayoutProps {
  navLinks: NavLinks[];
  children: React.ReactNode;
}

export function Layout({ navLinks, children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-parchment min-w-full overflow-x-auto">
      <Header navLinks={navLinks} />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
