import Header from "@/components/Header";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-parchment min-w-full overflow-x-auto">
      <Header />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
