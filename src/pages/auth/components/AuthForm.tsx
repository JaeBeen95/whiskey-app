interface AuthFormProps {
  title: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function AuthForm({ title, children, onSubmit }: AuthFormProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-gray-700 p-4 font-sans">
      <div className="bg-deep-navy-800 p-8 rounded-xl shadow-xl w-full max-w-md border border-gold-500/50 transition-all duration-300 hover:shadow-glow-gold">
        <h2 className="text-4xl font-serif text-light-gray-50 text-center mb-8">{title}</h2>
        <form onSubmit={onSubmit} noValidate>
          {children}
        </form>
      </div>
    </div>
  );
}
