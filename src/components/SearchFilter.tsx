import { useState } from "react";
import Button from "@/components/Button";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

interface SearchFilterProps {
  basicFilters: React.ReactNode;
  advancedFilters?: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onReset: () => void;
}

export default function SearchFilter({
  basicFilters,
  advancedFilters,
  onSubmit,
  onReset,
}: SearchFilterProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  return (
    <form
      onSubmit={onSubmit}
      className="bg-deep-navy-800 p-4 rounded-xl mb-8 border border-gold-500/20"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{basicFilters}</div>

      {isAdvancedOpen && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 border-t border-gold-500/10 pt-4">
          {advancedFilters}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-gold-500/10">
        <Button
          type="button"
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          variant="secondary"
          className="w-auto"
        >
          <AdjustmentsHorizontalIcon className="w-5 h-5" />
          상세 검색 {isAdvancedOpen ? "닫기" : "열기"}
        </Button>
        <div className="flex gap-2">
          <Button type="button" onClick={onReset} variant="secondary" className="w-auto">
            초기화
          </Button>
          <Button type="submit" className="w-auto">
            검색
          </Button>
        </div>
      </div>
    </form>
  );
}
