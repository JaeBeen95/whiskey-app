import FormField from "@/components/FormField";
import SearchFilter from "@/components/SearchFilter";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Checkbox from "@/components/CheckBox";
import CaskCard from "@/pages/cask/components/CaskCard";
import Button from "@/components/Button";
import { PlusIcon, MagnifyingGlassIcon, BuildingOfficeIcon } from "@heroicons/react/24/outline";

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
        basicFilters={
          <>
            <FormField label="캐스크 이름/번호" htmlFor="cask_name">
              <Input
                id="cask_name"
                icon={<MagnifyingGlassIcon className="w-5 h-5" />}
                placeholder="이름 또는 번호로 검색..."
                {...register("cask_name")}
              />
            </FormField>
            <FormField label="창고" htmlFor="warehouse">
              <Select
                id="warehouse"
                icon={<BuildingOfficeIcon className="w-5 h-5" />}
                {...register("warehouse")}
              >
                <option value="">모든 창고</option>
                <option value="Warehouse A">Warehouse A</option>
                <option value="Warehouse B">Warehouse B</option>
              </Select>
            </FormField>
          </>
        }
        advancedFilters={
          <>
            <FormField label="증류소 (실제)" htmlFor="distillery_true_name">
              <Input id="distillery_true_name" {...register("distillery_true_name")} />
            </FormField>
            <FormField label="캐스크 크기" htmlFor="cask_size">
              <Input id="cask_size" {...register("cask_size")} />
            </FormField>
            <FormField label="나무 종류" htmlFor="wood_type">
              <Input id="wood_type" {...register("wood_type")} />
            </FormField>
            <FormField label="시즈닝" htmlFor="seasoning">
              <Input id="seasoning" {...register("seasoning")} />
            </FormField>
            <FormField label="충전 유형" htmlFor="fill_type">
              <Input id="fill_type" {...{ ...register("fill_type") }} />
            </FormField>
            <FormField label="몰트 타입" htmlFor="malt_type">
              <Input id="malt_type" {...register("malt_type")} />
            </FormField>
            <div className="flex items-end pb-4">
              <Checkbox label="활성 캐스크만 보기" {...register("is_active")} />
            </div>
          </>
        }
      />

      <div className="bg-deep-navy-800 p-6 rounded-xl shadow-lg border border-gold-500/20 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caskList?.length === 0 && (
            <p className="text-cream-100 text-center col-span-full">검색 결과가 없습니다.</p>
          )}
          {caskList && caskList.map((cask) => <CaskCard key={cask.cask_id} cask={cask} />)}
        </div>
      </div>
    </div>
  );
}
