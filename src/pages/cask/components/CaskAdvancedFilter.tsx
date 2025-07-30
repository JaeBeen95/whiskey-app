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
      <FormField label="증류소 (실제)" htmlFor="distilleryTrueName">
        <Input id="distilleryTrueName" {...register("distilleryTrueName")} />
      </FormField>
      <FormField label="캐스크 크기" htmlFor="caskSize">
        <Input id="caskSize" {...register("caskSize")} />
      </FormField>
      <FormField label="나무 종류" htmlFor="woodType">
        <Input id="woodType" {...register("woodType")} />
      </FormField>
      <FormField label="시즈닝" htmlFor="seasoning">
        <Input id="seasoning" {...register("seasoning")} />
      </FormField>
      <FormField label="충전 유형" htmlFor="fillType">
        <Input id="fillType" {...register("fillType")} />
      </FormField>
      <FormField label="몰트 타입" htmlFor="maltType">
        <Input id="maltType" {...register("maltType")} />
      </FormField>
      <div className="flex items-end pb-4">
        <Checkbox label="활성 캐스크만 보기" {...register("isActive")} />
      </div>
    </>
  );
}
