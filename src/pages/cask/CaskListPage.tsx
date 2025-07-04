import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useModal } from "@/hooks/useModal";
import SearchFilter from "@/components/SearchFilter";
import Input from "@/components/Input";
import CaskFormModal from "@/pages/cask/components/CaskFormModal";
import Button from "@/components/Button";
import Select from "@/components/Select";
import CaskCard from "@/pages/cask/components/CaskCard";
import { PlusIcon, MagnifyingGlassIcon, BuildingOfficeIcon } from "@heroicons/react/24/outline";
import type { CaskContent } from "@/pages/cask/types";

interface SearchFormData {
  cask_name: string;
  warehouse: string;
}

const mockCasks: CaskContent[] = [
  {
    cask_id: 1,
    cask_name: "쿨일라 2011 #3124",
    cask_number: "CASK-001",
    malt_type: "Single Malt",
    abv: 60.1,
  },
  {
    cask_id: 2,
    cask_name: "글렌알라키 2008",
    cask_number: "CASK-002",
    malt_type: "Single Malt",
    abv: 55.8,
  },
  {
    cask_id: 3,
    cask_name: "맥캘란 18년 셰리",
    cask_number: "CASK-003",
    malt_type: "Single Malt",
    abv: 43.0,
  },
  {
    cask_id: 4,
    cask_name: "야마자키 DR",
    cask_number: "CASK-004",
    malt_type: "Single Malt",
    abv: 43.0,
  },
  {
    cask_id: 5,
    cask_name: "아드벡 코리브레칸",
    cask_number: "CASK-005",
    malt_type: "Single Malt",
    abv: 57.1,
  },
  {
    cask_id: 6,
    cask_name: "라프로익 쿼터 캐스크",
    cask_number: "CASK-006",
    malt_type: "Single Malt",
    abv: 48.0,
  },
];

export default function CaskListPage() {
  const { isOpen, openModal, closeModal } = useModal();
  const [searchParams, setSearchParams] = useState<SearchFormData>({
    cask_name: "",
    warehouse: "",
  });

  const { register, handleSubmit, reset } = useForm<SearchFormData>({
    defaultValues: { cask_name: "", warehouse: "" },
  });

  const handleCreateSubmit = async () => {
    console.log("생성");
    closeModal();
  };

  const handleSearch: SubmitHandler<SearchFormData> = (data) => {
    console.log("검색 조건:", data);
    setSearchParams(data);
  };

  const handleReset = () => {
    reset();
    handleSearch({ cask_name: "", warehouse: "" });
  };

  return (
    <div className="p-8 bg-deep-navy-900 min-h-screen text-light-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-serif text-gold-500">캐스크 목록</h1>
        <Button onClick={openModal} icon={<PlusIcon className="w-5 h-5" />}>
          새 캐스크 등록
        </Button>
      </div>

      <SearchFilter onSubmit={handleSubmit(handleSearch)} onReset={handleReset}>
        <div className="lg:col-span-2">
          <label htmlFor="cask_name" className="block text-sm font-bold text-gold-500 mb-1">
            캐스크 이름/번호
          </label>
          <Input
            id="cask_name"
            icon={<MagnifyingGlassIcon className="w-5 h-5" />}
            placeholder="이름 또는 번호로 검색..."
            {...register("cask_name")}
          />
        </div>

        <div>
          <label htmlFor="warehouse" className="block text-sm font-bold text-gold-500 mb-1">
            창고
          </label>
          <Select
            id="warehouse"
            icon={<BuildingOfficeIcon className="w-5 h-5" />}
            {...register("warehouse")}
          >
            <option value="">모든 창고</option>
            <option value="Warehouse A">Warehouse A</option>
            <option value="Warehouse B">Warehouse B</option>
            <option value="Warehouse C">Warehouse C</option>
          </Select>
        </div>
      </SearchFilter>

      <div className="bg-deep-navy-800 p-6 rounded-xl shadow-lg border border-gold-500/20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCasks.map((cask) => (
            <CaskCard key={cask.cask_id} cask={cask} />
          ))}
        </div>
      </div>
      <CaskFormModal
        isOpen={isOpen}
        onClose={closeModal}
        mode="create"
        onSubmit={handleCreateSubmit}
      />
    </div>
  );
}
