import type { ApiResponse } from "@/types/api";

export interface CaskEvent {
  event_at: string;
  event_comment: string;
  event_currency: string;
  event_id: number;
  event_price: number;
  event_type: string;
}

export interface CaskDetail extends CaskContent {
  bulk_liter: number;
  capacity_liters: number;
  cask_currency: string;
  cask_size: string;
  comment: string;
  distillery_display_name: string;
  distillery_true_name: string;
  events: CaskEvent[];
  expected_arrival_price: number;
  fill_type: string;
  lpa: number;
  ola_rla: string;
  price_per_bottle: number;
  price_per_lpa: number;
  purchase_price: number;
  seasoning: string;
  warehouse: string;
  wood_type: string;
}

export interface CaskContent {
  abv: number;
  cask_id: number;
  cask_name: string;
  cask_number: string;
  malt_type: string;
}

export interface Pageable {
  page?: number;
  size?: number;
  sort?: string[];
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface CaskSearchDto {
  warehouse?: string;
  distillery_true_name?: string;
  order_by?: number;
  cask_size?: string;
  wood_type?: string;
  cask_number?: string;
  cask_name?: string;
  fill_type?: string;
  is_active?: boolean;
  malt_type?: string;
  distillery_display_name?: string;
  seasoning?: string;
}

export interface GetCaskListParams {
  pageable?: Pageable;
  searchDto?: CaskSearchDto;
}

export interface CaskList {
  content: CaskContent[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: Sort[];
    unpaged: boolean;
  };
  size: number;
  sort: Sort[];
  totalElements: number;
  totalPages: number;
}

export interface CaskListResponse extends ApiResponse<CaskList> {}

export interface CreateCaskRequest {
  abv: number;
  bulk_liter: number;
  capacity_liters: number;
  cask_currency: string;
  cask_name: string;
  cask_number: string;
  cask_size: string;
  comment?: string;
  distillery_display_name: string;
  distillery_true_name: string;
  expected_arrival_price: number;
  fill_type: string;
  lpa: number;
  malt_type: string;
  ola_rla: string;
  price_per_bottle: number;
  price_per_lpa: number;
  purchase_price: number;
  seasoning: string;
  warehouse: string;
  wood_type: string;
  is_active?: boolean;
}

export interface UpdateCaskRequest extends Partial<CreateCaskRequest> {}

export type EventType = "bottling" | "regauging" | "reracking" | "sampling" | "split" | "transfer";
