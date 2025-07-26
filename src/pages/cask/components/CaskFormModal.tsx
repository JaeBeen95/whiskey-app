import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "@/components/modal/Modal";
import FormField from "@/components/FormField";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Button from "@/components/Button";
import type { CaskDetail, CreateCaskRequest } from "@/pages/cask/types";

interface CaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  initialData?: CaskDetail;
  onSubmit: (data: CreateCaskRequest) => Promise<void>;
}

const defaultCaskFormData: CreateCaskRequest = {
  abv: 0,
  bulk_liter: 0,
  capacity_liters: 0,
  cask_currency: "GBP",
  cask_name: "",
  cask_number: "",
  cask_size: "",
  comment: "",
  distillery_display_name_id: 0,
  distillery_true_name_id: 0,
  expected_arrival_price: 0,
  fill_type: "",
  lpa: 0,
  malt_type: "",
  olarla: "OLA",
  price_per_bottle: 0,
  price_per_lpa: 0,
  purchase_price: 0,
  seasoning: "",
  warehouse_id: 0,
  wood_type: "",
};

export default function CaskFormModal({
  isOpen,
  onClose,
  mode,
  initialData,
  onSubmit,
}: CaskFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CreateCaskRequest>({
    defaultValues: defaultCaskFormData,
    mode: "onChange",
  });

  //TODO: useQuery로 처리할 예정
  useEffect(() => {
    if (isOpen) {
      const dataToReset = mode === "edit" && initialData ? initialData : defaultCaskFormData;
      reset(dataToReset);
    }
  }, [isOpen, mode, initialData, reset]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "create" ? "새 캐스크 등록" : "캐스크 정보 수정"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 max-h-[60vh] overflow-y-auto pr-3">
          <h3 className="md:col-span-2 text-lg font-serif text-gold-500/90 mb-2 mt-2 border-b border-gold-500/20 pb-2">
            기본 정보
          </h3>
          <FormField label="캐스크 이름" htmlFor="cask_name" error={errors.cask_name?.message}>
            <Input
              id="cask_name"
              hasError={!!errors.cask_name}
              {...register("cask_name", { required: "필수 항목입니다." })}
            />
          </FormField>
          <FormField label="캐스크 번호" htmlFor="cask_number" error={errors.cask_number?.message}>
            <Input id="cask_number" hasError={!!errors.cask_number} {...register("cask_number")} />
          </FormField>
          <FormField
            label="증류소 (표시 ID)"
            htmlFor="distillery_display_name_id"
            error={errors.distillery_display_name_id?.message}
          >
            <Input
              id="distillery_display_name_id"
              hasError={!!errors.distillery_display_name_id}
              {...register("distillery_display_name_id")}
            />
          </FormField>
          <FormField
            label="증류소 (실제 ID)"
            htmlFor="distillery_true_name_id"
            error={errors.distillery_true_name_id?.message}
          >
            <Input
              id="distillery_true_name_id"
              hasError={!!errors.distillery_true_name_id}
              {...register("distillery_true_name_id")}
            />
          </FormField>
          <FormField label="창고" htmlFor="warehouse" error={errors.warehouse_id?.message}>
            <Input
              id="warehouse_id"
              hasError={!!errors.warehouse_id}
              {...register("warehouse_id")}
            />
          </FormField>
          <div className="md:col-span-2">
            <FormField label="코멘트" htmlFor="comment" error={errors.comment?.message}>
              <textarea
                id="comment"
                rows={3}
                className="w-full p-2 rounded bg-deep-navy-900 border border-gold-500/40 text-light-gray-50"
                {...register("comment")}
              />
            </FormField>
          </div>
          <h3 className="md:col-span-2 text-lg font-serif text-gold-500/90 mb-2 mt-4 border-b border-gold-500/20 pb-2">
            물리적 특성
          </h3>
          <FormField label="캐스크 크기" htmlFor="cask_size" error={errors.cask_size?.message}>
            <Input id="cask_size" hasError={!!errors.cask_size} {...register("cask_size")} />
          </FormField>
          <FormField label="나무 종류" htmlFor="wood_type" error={errors.wood_type?.message}>
            <Input id="wood_type" hasError={!!errors.wood_type} {...register("wood_type")} />
          </FormField>
          <FormField label="시즈닝" htmlFor="seasoning" error={errors.seasoning?.message}>
            <Input id="seasoning" hasError={!!errors.seasoning} {...register("seasoning")} />
          </FormField>
          <FormField label="충전 유형" htmlFor="fill_type" error={errors.fill_type?.message}>
            <Input id="fill_type" hasError={!!errors.fill_type} {...register("fill_type")} />
          </FormField>
          <FormField label="몰트 타입" htmlFor="malt_type" error={errors.malt_type?.message}>
            <Input id="malt_type" hasError={!!errors.malt_type} {...register("malt_type")} />
          </FormField>
          <FormField label="ABV (%)" htmlFor="abv" error={errors.abv?.message}>
            <Input
              id="abv"
              type="number"
              step="0.1"
              hasError={!!errors.abv}
              {...register("abv", { valueAsNumber: true })}
            />
          </FormField>
          <FormField label="벌크 리터 (L)" htmlFor="bulk_liter" error={errors.bulk_liter?.message}>
            <Input
              id="bulk_liter"
              type="number"
              step="0.1"
              hasError={!!errors.bulk_liter}
              {...register("bulk_liter", { valueAsNumber: true })}
            />
          </FormField>
          <FormField
            label="용량 리터 (L)"
            htmlFor="capacity_liters"
            error={errors.capacity_liters?.message}
          >
            <Input
              id="capacity_liters"
              type="number"
              step="0.1"
              hasError={!!errors.capacity_liters}
              {...register("capacity_liters", { valueAsNumber: true })}
            />
          </FormField>
          <FormField label="LPA" htmlFor="lpa" error={errors.lpa?.message}>
            <Input
              id="lpa"
              type="number"
              step="0.1"
              hasError={!!errors.lpa}
              {...register("lpa", { valueAsNumber: true })}
            />
          </FormField>
          <FormField label="OLA" htmlFor="olarla" error={errors.olarla?.message}>
            <Input id="olarla" hasError={!!errors.olarla} {...register("olarla")} />
          </FormField>
          <h3 className="md:col-span-2 text-lg font-serif text-gold-500/90 mb-2 mt-4 border-b border-gold-500/20 pb-2">
            재무 정보
          </h3>
          <FormField
            label="구매 가격"
            htmlFor="purchase_price"
            error={errors.purchase_price?.message}
          >
            <Input
              id="purchase_price"
              type="number"
              step="0.01"
              hasError={!!errors.purchase_price}
              {...register("purchase_price", { valueAsNumber: true })}
            />
          </FormField>
          <FormField
            label="캐스크 통화"
            htmlFor="cask_currency"
            error={errors.cask_currency?.message}
          >
            <Select
              id="cask_currency"
              hasError={!!errors.cask_currency}
              {...register("cask_currency")}
            >
              <option>GBP</option>
              <option>USD</option>
              <option>KRW</option>
              <option>JPY</option>
            </Select>
          </FormField>
          <FormField
            label="예상 도착 가격"
            htmlFor="expected_arrival_price"
            error={errors.expected_arrival_price?.message}
          >
            <Input
              id="expected_arrival_price"
              type="number"
              step="0.01"
              hasError={!!errors.expected_arrival_price}
              {...register("expected_arrival_price", { valueAsNumber: true })}
            />
          </FormField>
          <FormField
            label="병당 가격"
            htmlFor="price_per_bottle"
            error={errors.price_per_bottle?.message}
          >
            <Input
              id="price_per_bottle"
              type="number"
              step="0.01"
              hasError={!!errors.price_per_bottle}
              {...register("price_per_bottle", { valueAsNumber: true })}
            />
          </FormField>
          <FormField
            label="LPA당 가격"
            htmlFor="price_per_lpa"
            error={errors.price_per_lpa?.message}
          >
            <Input
              id="price_per_lpa"
              type="number"
              step="0.01"
              hasError={!!errors.price_per_lpa}
              {...register("price_per_lpa", { valueAsNumber: true })}
            />
          </FormField>
        </div>
        <div className="mt-6 flex justify-end gap-x-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            취소
          </Button>
          <Button type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? "저장 중..." : mode === "create" ? "등록" : "수정"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
