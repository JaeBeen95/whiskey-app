import FormField from "@/components/FormField";
import Input from "@/components/Input";
import Checkbox from "@/components/CheckBox";
import type { CaskSearchDto } from "@/pages/cask/types";
import type { UseFormRegister } from "react-hook-form";

interface CaskAdvancedFiltersProps {
  register: UseFormRegister<CaskSearchDto>;
}

export default function CaskAdvancedFilters({ register }: CaskAdvancedFiltersProps) {
  return (
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
  );
}
