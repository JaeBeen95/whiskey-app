import Button from "@/components/Button";

interface SearchFilterProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onReset: () => void;
}

export default function SearchFilter({ children, onSubmit, onReset }: SearchFilterProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-deep-navy-800 p-4 rounded-xl mb-8 border border-gold-500/20"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-end">
        {children}
        <div className="flex gap-2 pt-5">
          <Button type="submit" className="w-full">
            검색
          </Button>
          <Button
            type="button"
            onClick={onReset}
            className="w-full bg-deep-navy-900 text-light-gray-50 hover:bg-deep-navy-900/80"
          >
            초기화
          </Button>
        </div>
      </div>
    </form>
  );
}
