import SearchFilter from "@/components/SearchFilter";
import CaskBasicFilter from "@/pages/cask/components/CaskBasicFilter";
import CaskAdvancedFilters from "@/pages/cask/components/CaskAdvancedFilter";
import CaskCard from "@/pages/cask/components/CaskCard";
import Button from "@/components/Button";
import { PlusIcon } from "@heroicons/react/24/outline";
import type { CaskContent, CaskSearchDto } from "@/pages/cask/types";
import type { UseFormRegister, UseFormHandleSubmit, SubmitHandler } from "react-hook-form";

interface CaskListContentProps {
  caskList: CaskContent[] | undefined;
  register: UseFormRegister<CaskSearchDto>;
  handleSubmit: UseFormHandleSubmit<CaskSearchDto>;
  handleSearch: SubmitHandler<CaskSearchDto>;
  handleReset: () => void;
  openModal: () => void;
}

export default function CaskListContent({
  caskList,
  register,
  handleSubmit,
  handleSearch,
  handleReset,
  openModal,
}: CaskListContentProps) {
  return (
    <div className="p-8 bg-deep-navy-900 min-h-screen text-light-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-serif text-gold-500">캐스크 목록</h1>
        <Button onClick={openModal} icon={<PlusIcon className="w-5 h-5" />} variant="primary">
          새 캐스크 등록
        </Button>
      </div>

      <SearchFilter
        onSubmit={handleSubmit(handleSearch)}
        onReset={handleReset}
        basicFilters={<CaskBasicFilter register={register} />}
        advancedFilters={<CaskAdvancedFilters register={register} />}
      />

      <div className="bg-deep-navy-800 p-6 rounded-xl shadow-lg border border-gold-500/20 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caskList?.length === 0 && (
            <p className="text-cream-100 text-center col-span-full">검색 결과가 없습니다.</p>
          )}
          {caskList && caskList.map((cask) => <CaskCard key={cask.caskId} cask={cask} />)}
        </div>
      </div>
    </div>
  );
}
