import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useModal } from "@/hooks/useModal";
import FormField from "@/components/FormField";
import SearchFilter from "@/components/SearchFilter";
import Input from "@/components/Input";
import CaskFormModal from "@/pages/cask/components/CaskFormModal";
import Button from "@/components/Button";
import Select from "@/components/Select";
import Checkbox from "@/components/CheckBox";
import CaskCard from "@/pages/cask/components/CaskCard";
import { PlusIcon, MagnifyingGlassIcon, BuildingOfficeIcon } from "@heroicons/react/24/outline";
import type { CaskContent } from "@/pages/cask/types";
import { useQuery } from "@/hooks/useQuery";
import { getCaskList } from "@/pages/cask/api";

interface SearchFormData {
  cask_name: string;
  warehouse: string;
  distillery_true_name: string;
  cask_size: string;
  wood_type: string;
  seasoning: string;
  fill_type: string;
  malt_type: string;
  is_active: boolean;
  order_by: string;
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
  const { data } = useQuery({
    queryKey: ["cask"],
    queryFn: () => getCaskList({ page: 1, size: 10 }),
  });

  const { isOpen, openModal, closeModal } = useModal();
  const [searchParams, setSearchParams] = useState<Partial<SearchFormData>>({});

  const { register, handleSubmit, reset } = useForm<SearchFormData>({
    defaultValues: { cask_name: "", warehouse: "", is_active: true, order_by: "cask_name,asc" },
  });

  const handleCreateSubmit = async () => {
    closeModal();
  };
  const handleSearch: SubmitHandler<SearchFormData> = (data) => {
    setSearchParams(data);
  };
  const handleReset = () => {
    reset();
    handleSearch({
      cask_name: "",
      warehouse: "",
      is_active: true,
      order_by: "cask_name,asc",
      distillery_true_name: "",
      cask_size: "",
      wood_type: "",
      seasoning: "",
      fill_type: "",
      malt_type: "",
    });
  };

  return (
    <div className="p-8 bg-deep-navy-900 min-h-screen text-light-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-serif text-gold-500">캐스크 목록</h1>
        <Button onClick={openModal} icon={<PlusIcon className="w-5 h-5" />}>
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
            <FormField label="정렬" htmlFor="order_by">
              <Select id="order_by" {...register("order_by")}>
                <option value="cask_name,asc">이름 (오름차순)</option>
                <option value="cask_name,desc">이름 (내림차순)</option>
                <option value="purchase_price,asc">가격 (낮은순)</option>
                <option value="purchase_price,desc">가격 (높은순)</option>
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
              <Input id="fill_type" {...register("fill_type")} />
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
