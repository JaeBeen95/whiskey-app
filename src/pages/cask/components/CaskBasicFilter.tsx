import FormField from "@/components/FormField";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { MagnifyingGlassIcon, BuildingOfficeIcon } from "@heroicons/react/24/outline";
import type { CaskSearchDto } from "@/pages/cask/types";
import type { UseFormRegister } from "react-hook-form";

interface CaskBasicFilterProps {
  register: UseFormRegister<CaskSearchDto>;
}

export default function CaskBasicFilter({ register }: CaskBasicFilterProps) {
  return (
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
  );
}
