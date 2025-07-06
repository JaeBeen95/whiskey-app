import { whiskeyAppApiClient } from "@/api/client";
import { WHISKEY_API_PATH } from "@/constants/apiPath";
import type {
  CaskDetail,
  CaskList,
  CaskListResponse,
  CreateCaskRequest,
  GetCaskListParams,
  UpdateCaskRequest,
} from "@/pages/cask/types";
import type { ApiResponse } from "@/types/api";

export const getCaskList = (params: GetCaskListParams): Promise<CaskListResponse> => {
  return whiskeyAppApiClient.get<CaskList, GetCaskListParams>(WHISKEY_API_PATH.CASK.BASE, params);
};

export const getCaskDetail = (caskId: number | string): Promise<ApiResponse<CaskDetail>> => {
  return whiskeyAppApiClient.get<CaskDetail>(WHISKEY_API_PATH.CASK.DETAIL(caskId));
};

export const createCask = (data: CreateCaskRequest): Promise<ApiResponse<CaskDetail>> => {
  return whiskeyAppApiClient.post<CaskDetail, CreateCaskRequest>(WHISKEY_API_PATH.CASK.BASE, data);
};

export const updateCask = (
  caskId: number | string,
  data: UpdateCaskRequest
): Promise<ApiResponse<CaskDetail>> => {
  return whiskeyAppApiClient.patch<CaskDetail, UpdateCaskRequest>(
    WHISKEY_API_PATH.CASK.DETAIL(caskId),
    data
  );
};

export const deleteCask = (caskId: number | string): Promise<ApiResponse<null>> => {
  return whiskeyAppApiClient.delete<null>(WHISKEY_API_PATH.CASK.DETAIL(caskId));
};
