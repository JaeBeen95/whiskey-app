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
  onSubmit: (data: CreateCaskRequest) => void;
}

const defaultCaskFormData: CreateCaskRequest = {
  abv: 0,
  bulkLiter: 0,
  capacityLiters: 0,
  caskCurrency: "GBP",
  caskName: "",
  caskNumber: "",
  caskSize: "",
  comment: "",
  distilleryDisplayNameId: 0,
  distilleryTrueNameId: 0,
  expectedArrivalPrice: 0,
  fillType: "",
  lpa: 0,
  maltType: "",
  olarla: "OLA",
  pricePerBottle: 0,
  pricePerLpa: 0,
  purchasePrice: 0,
  seasoning: "",
  warehouseId: 0,
  woodType: "",
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
          <FormField label="캐스크 이름" htmlFor="caskName" error={errors.caskName?.message}>
            <Input
              id="caskName"
              hasError={!!errors.caskName}
              {...register("caskName", { required: "필수 항목입니다." })}
            />
          </FormField>
          <FormField label="캐스크 번호" htmlFor="caskNumber" error={errors.caskNumber?.message}>
            <Input id="caskNumber" hasError={!!errors.caskNumber} {...register("caskNumber")} />
          </FormField>
          <FormField
            label="증류소 (표시 ID)"
            htmlFor="distilleryDisplayNameId"
            error={errors.distilleryDisplayNameId?.message}
          >
            <Input
              id="distilleryDisplayNameId"
              hasError={!!errors.distilleryDisplayNameId}
              {...register("distilleryDisplayNameId")}
            />
          </FormField>
          <FormField
            label="증류소 (실제 ID)"
            htmlFor="distilleryTrueNameId"
            error={errors.distilleryTrueNameId?.message}
          >
            <Input
              id="distilleryTrueNameId"
              hasError={!!errors.distilleryTrueNameId}
              {...register("distilleryTrueNameId")}
            />
          </FormField>
          <FormField label="창고" htmlFor="warehouse" error={errors.warehouseId?.message}>
            <Input id="warehouseId" hasError={!!errors.warehouseId} {...register("warehouseId")} />
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
          <FormField label="캐스크 크기" htmlFor="caskSize" error={errors.caskSize?.message}>
            <Input id="caskSize" hasError={!!errors.caskSize} {...register("caskSize")} />
          </FormField>
          <FormField label="나무 종류" htmlFor="woodType" error={errors.woodType?.message}>
            <Input id="woodType" hasError={!!errors.woodType} {...register("woodType")} />
          </FormField>
          <FormField label="시즈닝" htmlFor="seasoning" error={errors.seasoning?.message}>
            <Input id="seasoning" hasError={!!errors.seasoning} {...register("seasoning")} />
          </FormField>
          <FormField label="충전 유형" htmlFor="fillType" error={errors.fillType?.message}>
            <Input id="fillType" hasError={!!errors.fillType} {...register("fillType")} />
          </FormField>
          <FormField label="몰트 타입" htmlFor="maltType" error={errors.maltType?.message}>
            <Input id="maltType" hasError={!!errors.maltType} {...register("maltType")} />
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
          <FormField label="벌크 리터 (L)" htmlFor="bulkLiter" error={errors.bulkLiter?.message}>
            <Input
              id="bulkLiter"
              type="number"
              step="0.1"
              hasError={!!errors.bulkLiter}
              {...register("bulkLiter", { valueAsNumber: true })}
            />
          </FormField>
          <FormField
            label="용량 리터 (L)"
            htmlFor="capacityLiters"
            error={errors.capacityLiters?.message}
          >
            <Input
              id="capacityLiters"
              type="number"
              step="0.1"
              hasError={!!errors.capacityLiters}
              {...register("capacityLiters", { valueAsNumber: true })}
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
            htmlFor="purchasePrice"
            error={errors.purchasePrice?.message}
          >
            <Input
              id="purchasePrice"
              type="number"
              step="0.01"
              hasError={!!errors.purchasePrice}
              {...register("purchasePrice", { valueAsNumber: true })}
            />
          </FormField>
          <FormField
            label="캐스크 통화"
            htmlFor="caskCurrency"
            error={errors.caskCurrency?.message}
          >
            <Select
              id="caskCurrency"
              hasError={!!errors.caskCurrency}
              {...register("caskCurrency")}
            >
              <option>GBP</option>
              <option>USD</option>
              <option>KRW</option>
              <option>JPY</option>
            </Select>
          </FormField>
          <FormField
            label="예상 도착 가격"
            htmlFor="expectedArrivalPrice"
            error={errors.expectedArrivalPrice?.message}
          >
            <Input
              id="expectedArrivalPrice"
              type="number"
              step="0.01"
              hasError={!!errors.expectedArrivalPrice}
              {...register("expectedArrivalPrice", { valueAsNumber: true })}
            />
          </FormField>
          <FormField
            label="병당 가격"
            htmlFor="pricePerBottle"
            error={errors.pricePerBottle?.message}
          >
            <Input
              id="pricePerBottle"
              type="number"
              step="0.01"
              hasError={!!errors.pricePerBottle}
              {...register("pricePerBottle", { valueAsNumber: true })}
            />
          </FormField>
          <FormField label="LPA당 가격" htmlFor="pricePerLpa" error={errors.pricePerLpa?.message}>
            <Input
              id="pricePerLpa"
              type="number"
              step="0.01"
              hasError={!!errors.pricePerLpa}
              {...register("pricePerLpa", { valueAsNumber: true })}
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
