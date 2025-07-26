export interface CaskContent {
  abv: number;
  caskId: number;
  caskName: string;
  caskNumber: string;
  maltType: string;
}

export interface CaskEvent {
  event_at: string;
  event_comment: string;
  event_currency: string;
  event_id: number;
  event_price: number;
  event_type: string;
}

export interface CaskDetail extends CaskContent {
  bulkLiter: number;
  capacityLiters: number;
  caskCurrency: string;
  caskSize: string;
  comment?: string;
  distilleryDisplayName: string;
  distilleryTrueName: string;
  events: CaskEvent[];
  expectedArrivalPrice: number;
  fillType: string;
  lpa: number;
  olarla: string;
  pricePerBottle: number;
  pricePerLpa: number;
  purchasePrice: number;
  seasoning: string;
  warehouse: string;
  woodType: string;
  isActive?: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
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

export interface CaskSearchDto {
  warehouse?: string;
  distilleryTrueName?: string;
  orderBy?: number;
  caskSize?: string;
  woodType?: string;
  caskNumber?: string;
  caskName?: string;
  fillType?: string;
  isActive?: boolean;
  maltType?: string;
  distilleryDisplayName?: string;
  seasoning?: string;
}

export interface GetCaskListParams extends CaskSearchDto {
  page: number;
  size: number;
  sort?: string[];
}

export interface CreateCaskRequest {
  abv: number;
  bulkLiter: number;
  capacityLiters: number;
  caskCurrency: string;
  caskName: string;
  caskNumber: string;
  caskSize: string;
  comment?: string;
  distilleryDisplayNameId: number;
  distilleryTrueNameId: number;
  expectedArrivalPrice: number;
  fillType: string;
  lpa: number;
  maltType: string;
  olarla: string;
  pricePerBottle: number;
  pricePerLpa: number;
  purchasePrice: number;
  seasoning: string;
  warehouseId: number;
  woodType: string;
}

export interface UpdateCaskRequest extends CreateCaskRequest {}

export type EventType = "bottling" | "regauging" | "reracking" | "sampling" | "split" | "transfer";
