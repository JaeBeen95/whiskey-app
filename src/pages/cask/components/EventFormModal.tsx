import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "@/components/modal/Modal";
import FormField from "@/components/FormField";
import Button from "@/components/Button";
import type { EventType } from "@/pages/cask/types";
import Select from "@/components/Select";
import Input from "@/components/Input";

interface EventFormModalProps {
  eventType: EventType | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function EventFormModal({
  eventType,
  isOpen,
  onClose,
  onSubmit,
}: EventFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen, reset]);

  if (!isOpen || !eventType) return null;

  const eventTitleMap: Record<EventType, string> = {
    bottling: "보틀링 등록",
    regauging: "리게이징 등록",
    reracking: "리래킹 등록",
    sampling: "샘플링 등록",
    split: "스플릿 등록",
    transfer: "창고 이동",
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={eventTitleMap[eventType]}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-3">
          <FormField
            label="이벤트 날짜"
            htmlFor="event_at"
            error={errors.event_at?.message as string}
          >
            <Input
              id="event_at"
              type="date"
              hasError={!!errors.event_at}
              {...register("event_at", { required: "날짜는 필수입니다." })}
            />
          </FormField>

          {eventType === "bottling" && (
            <>
              <FormField
                label="병 이름"
                htmlFor="bottle_name"
                error={errors.bottle_name?.message as string}
              >
                <Input
                  id="bottle_name"
                  hasError={!!errors.bottle_name}
                  {...register("bottle_name", { required: true })}
                />
              </FormField>
              <FormField label="시리즈 이름" htmlFor="series_name">
                <Input id="series_name" {...register("series_name")} />
              </FormField>
              <FormField
                label="병 개수"
                htmlFor="bottle_count"
                error={errors.bottle_count?.message as string}
              >
                <Input
                  id="bottle_count"
                  type="number"
                  hasError={!!errors.bottle_count}
                  {...register("bottle_count", { required: true, valueAsNumber: true })}
                />
              </FormField>
              <FormField
                label="병입된 용량 (L)"
                htmlFor="bottled_volume"
                error={errors.bottled_volume?.message as string}
              >
                <Input
                  id="bottled_volume"
                  type="number"
                  step="0.01"
                  hasError={!!errors.bottled_volume}
                  {...register("bottled_volume", { required: true, valueAsNumber: true })}
                />
              </FormField>
              <FormField label="ABV (%)" htmlFor="abv" error={errors.abv?.message as string}>
                <Input
                  id="abv"
                  type="number"
                  step="0.1"
                  hasError={!!errors.abv}
                  {...register("abv", { required: true, valueAsNumber: true })}
                />
              </FormField>
              <FormField
                label="보틀링 비용"
                htmlFor="bottling_cost"
                error={errors.bottling_cost?.message as string}
              >
                <Input
                  id="bottling_cost"
                  type="number"
                  step="0.01"
                  hasError={!!errors.bottling_cost}
                  {...register("bottling_cost", { valueAsNumber: true })}
                />
              </FormField>
              <FormField
                label="캐스크 ID 목록"
                htmlFor="cask_ids"
                error={errors.cask_ids?.message as string}
              >
                <Input
                  id="cask_ids"
                  placeholder="쉼표로 구분하여 입력 (예: 1,2,3)"
                  hasError={!!errors.cask_ids}
                  {...register("cask_ids", { required: true })}
                />
              </FormField>
            </>
          )}

          {eventType === "regauging" && (
            <>
              <FormField label="ABV (%)" htmlFor="abv" error={errors.abv?.message as string}>
                <Input
                  id="abv"
                  type="number"
                  step="0.1"
                  hasError={!!errors.abv}
                  {...register("abv", { required: true, valueAsNumber: true })}
                />
              </FormField>
              <FormField
                label="벌크 리터 (L)"
                htmlFor="bulk_liter"
                error={errors.bulk_liter?.message as string}
              >
                <Input
                  id="bulk_liter"
                  type="number"
                  step="0.1"
                  hasError={!!errors.bulk_liter}
                  {...register("bulk_liter", { required: true, valueAsNumber: true })}
                />
              </FormField>
              <FormField label="LPA" htmlFor="lpa" error={errors.lpa?.message as string}>
                <Input
                  id="lpa"
                  type="number"
                  step="0.1"
                  hasError={!!errors.lpa}
                  {...register("lpa", { required: true, valueAsNumber: true })}
                />
              </FormField>
              <FormField
                label="비용"
                htmlFor="event_price"
                error={errors.event_price?.message as string}
              >
                <Input
                  id="event_price"
                  type="number"
                  step="0.01"
                  hasError={!!errors.event_price}
                  {...register("event_price", { valueAsNumber: true })}
                />
              </FormField>
            </>
          )}

          {eventType === "reracking" && (
            <>
              <FormField
                label="소스 캐스크 ID 목록"
                htmlFor="source_cask_ids"
                error={errors.source_cask_ids?.message as string}
              >
                <Input
                  id="source_cask_ids"
                  placeholder="쉼표로 구분하여 입력 (예: 1,2,3)"
                  hasError={!!errors.source_cask_ids}
                  {...register("source_cask_ids", { required: true })}
                />
              </FormField>
              <FormField
                label="타겟 캐스크 ID"
                htmlFor="target_cask_id"
                error={errors.target_cask_id?.message as string}
              >
                <Input
                  id="target_cask_id"
                  type="number"
                  hasError={!!errors.target_cask_id}
                  {...register("target_cask_id", { required: true, valueAsNumber: true })}
                />
              </FormField>
            </>
          )}

          {eventType === "sampling" && (
            <>
              <FormField label="측정된 ABV (%)" htmlFor="abv" error={errors.abv?.message as string}>
                <Input
                  id="abv"
                  type="number"
                  step="0.1"
                  hasError={!!errors.abv}
                  {...register("abv", { required: true, valueAsNumber: true })}
                />
              </FormField>
              <FormField
                label="샘플링 양 (L)"
                htmlFor="sampling_volume"
                error={errors.sampling_volume?.message as string}
              >
                <Input
                  id="sampling_volume"
                  type="number"
                  step="0.01"
                  hasError={!!errors.sampling_volume}
                  {...register("sampling_volume", { required: true, valueAsNumber: true })}
                />
              </FormField>
            </>
          )}

          {eventType === "split" && (
            <>
              <FormField
                label="소스 캐스크 ID"
                htmlFor="source_cask_id"
                error={errors.source_cask_id?.message as string}
              >
                <Input
                  id="source_cask_id"
                  type="number"
                  hasError={!!errors.source_cask_id}
                  {...register("source_cask_id", { required: true, valueAsNumber: true })}
                />
              </FormField>
              <FormField
                label="타겟 캐스크 ID 목록"
                htmlFor="target_cask_ids"
                error={errors.target_cask_ids?.message as string}
              >
                <Input
                  id="target_cask_ids"
                  placeholder="쉼표로 구분하여 입력 (예: 4,5,6)"
                  hasError={!!errors.target_cask_ids}
                  {...register("target_cask_ids", { required: true })}
                />
              </FormField>
            </>
          )}

          {eventType === "transfer" && (
            <>
              <FormField
                label="새로운 창고 ID"
                htmlFor="new_warehouse_id"
                error={errors.new_warehouse_id?.message as string}
              >
                <Input
                  id="new_warehouse_id"
                  type="number"
                  hasError={!!errors.new_warehouse_id}
                  {...register("new_warehouse_id", { required: true, valueAsNumber: true })}
                />
              </FormField>
              <FormField
                label="이동할 캐스크 ID 목록"
                htmlFor="cask_ids"
                error={errors.cask_ids?.message as string}
              >
                <Input
                  id="cask_ids"
                  placeholder="쉼표로 구분하여 입력 (예: 1,2,3)"
                  hasError={!!errors.cask_ids}
                  {...register("cask_ids", { required: true })}
                />
              </FormField>
            </>
          )}

          <FormField
            label="통화"
            htmlFor="event_currency"
            error={errors.event_currency?.message as string}
          >
            <Select
              id="event_currency"
              hasError={!!errors.event_currency}
              {...register("event_currency")}
            >
              <option value="GBP">GBP</option>
              <option value="USD">USD</option>
              <option value="KRW">KRW</option>
              <option value="JPY">JPY</option>
            </Select>
          </FormField>
          <FormField label="코멘트" htmlFor="event_comment">
            <textarea
              id="event_comment"
              className="w-full p-2 rounded bg-deep-navy-900 border border-gold-500/40 text-light-gray-50"
              rows={3}
              {...register("event_comment")}
            />
          </FormField>
        </div>

        <div className="mt-6 flex justify-end gap-x-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            취소
          </Button>
          <Button type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? "저장 중..." : "등록"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
