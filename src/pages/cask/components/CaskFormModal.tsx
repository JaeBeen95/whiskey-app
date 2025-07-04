import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "@/components/modal/Modal";
import FormField from "@/components/FormField";
import Button from "@/components/Button";
import type { CaskDetail } from "@/pages/cask/types";

interface CaskFormData extends CaskDetail {
  is_active: boolean;
}

interface CaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  initialData?: CaskFormData;
  onSubmit: (data: CaskFormData) => Promise<void>;
}

const defaultCaskFormData: CaskFormData = {
  cask_id: 0,
  cask_name: "",
  cask_number: "",
  distillery_display_name: "",
  distillery_true_name: "",
  warehouse: "",
  cask_size: "",
  wood_type: "",
  seasoning: "",
  fill_type: "",
  malt_type: "",
  abv: 0,
  bulk_liter: 0,
  capacity_liters: 0,
  lpa: 0,
  ola_rla: "OLA",
  purchase_price: 0,
  cask_currency: "GBP",
  expected_arrival_price: 0,
  price_per_bottle: 0,
  price_per_lpa: 0,
  comment: "",
  is_active: true,
  events: [],
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
  } = useForm<CaskFormData>({
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
      title={mode === "create" ? "캐스크 등록" : "캐스크 수정"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 max-h-[60vh] overflow-y-auto pr-3">
          <h3 className="md:col-span-2 text-lg font-serif text-gold-500/90 mb-2 mt-2 border-b border-gold-500/20 pb-2">
            기본 정보
          </h3>
          <FormField
            label="캐스크 이름"
            error={errors.cask_name?.message}
            inputProps={{ ...register("cask_name", { required: "필수 항목입니다." }) }}
          />
          <FormField
            label="캐스크 번호"
            error={errors.cask_number?.message}
            inputProps={{ ...register("cask_number") }}
          />
          <FormField
            label="증류소 (표시)"
            error={errors.distillery_display_name?.message}
            inputProps={{ ...register("distillery_display_name") }}
          />
          <FormField
            label="증류소 (실제)"
            error={errors.distillery_true_name?.message}
            inputProps={{ ...register("distillery_true_name") }}
          />
          <FormField
            label="창고"
            error={errors.warehouse?.message}
            inputProps={{ ...register("warehouse") }}
          />
          <div className="md:col-span-2 flex items-center my-2">
            <input
              id="is_active"
              type="checkbox"
              className="h-4 w-4 rounded text-gold-500 border-gold-500/30 focus:ring-gold-500 bg-dark-gray-700"
              {...register("is_active")}
            />
            <label htmlFor="is_active" className="ml-3 block text-sm text-light-gray-50">
              활성 캐스크
            </label>
          </div>
          <div className="md:col-span-2">
            <FormField
              label="코멘트"
              error={errors.comment?.message}
              inputProps={{ type: "textarea", rows: 3, ...register("comment") }}
            />
          </div>

          <h3 className="md:col-span-2 text-lg font-serif text-gold-500/90 mb-2 mt-4 border-b border-gold-500/20 pb-2">
            물리적 특성
          </h3>
          <FormField
            label="캐스크 크기"
            error={errors.cask_size?.message}
            inputProps={{ ...register("cask_size") }}
          />
          <FormField
            label="나무 종류"
            error={errors.wood_type?.message}
            inputProps={{ ...register("wood_type") }}
          />
          <FormField
            label="시즈닝"
            error={errors.seasoning?.message}
            inputProps={{ ...register("seasoning") }}
          />
          <FormField
            label="충전 유형"
            error={errors.fill_type?.message}
            inputProps={{ ...register("fill_type") }}
          />
          <FormField
            label="몰트 타입"
            error={errors.malt_type?.message}
            inputProps={{ ...register("malt_type") }}
          />
          <FormField
            label="ABV (%)"
            error={errors.abv?.message}
            inputProps={{
              type: "number",
              step: "0.1",
              ...register("abv", { valueAsNumber: true }),
            }}
          />
          <FormField
            label="벌크 리터 (L)"
            error={errors.bulk_liter?.message}
            inputProps={{
              type: "number",
              step: "0.1",
              ...register("bulk_liter", { valueAsNumber: true }),
            }}
          />
          <FormField
            label="용량 리터 (L)"
            error={errors.capacity_liters?.message}
            inputProps={{
              type: "number",
              step: "0.1",
              ...register("capacity_liters", { valueAsNumber: true }),
            }}
          />
          <FormField
            label="LPA"
            error={errors.lpa?.message}
            inputProps={{
              type: "number",
              step: "0.1",
              ...register("lpa", { valueAsNumber: true }),
            }}
          />
          <FormField
            label="OLA/RLA"
            error={errors.ola_rla?.message}
            inputProps={{ ...register("ola_rla") }}
          />

          <h3 className="md:col-span-2 text-lg font-serif text-gold-500/90 mb-2 mt-4 border-b border-gold-500/20 pb-2">
            재무 정보
          </h3>
          <FormField
            label="구매 가격"
            error={errors.purchase_price?.message}
            inputProps={{
              type: "number",
              step: "0.01",
              ...register("purchase_price", { valueAsNumber: true }),
            }}
          />
          <FormField
            label="캐스크 통화"
            error={errors.cask_currency?.message}
            inputProps={{ ...register("cask_currency") }}
          />
          <FormField
            label="예상 도착 가격"
            error={errors.expected_arrival_price?.message}
            inputProps={{
              type: "number",
              step: "0.01",
              ...register("expected_arrival_price", { valueAsNumber: true }),
            }}
          />
          <FormField
            label="병당 가격"
            error={errors.price_per_bottle?.message}
            inputProps={{
              type: "number",
              step: "0.01",
              ...register("price_per_bottle", { valueAsNumber: true }),
            }}
          />
          <FormField
            label="LPA당 가격"
            error={errors.price_per_lpa?.message}
            inputProps={{
              type: "number",
              step: "0.01",
              ...register("price_per_lpa", { valueAsNumber: true }),
            }}
          />
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
