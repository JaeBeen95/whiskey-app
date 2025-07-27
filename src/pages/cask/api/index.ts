import apiClient from "@/api/client";
import { WHISKEY_API_PATH } from "@/constants/apiPath";
import type {
  CaskDetail,
  CaskList,
  CreateCaskRequest,
  GetCaskListParams,
  UpdateCaskRequest,
} from "@/pages/cask/types";
import type { ApiResponse } from "@/types/api";
import type { AxiosResponse } from "axios";

export const getCaskList = (
  params: GetCaskListParams
): Promise<AxiosResponse<ApiResponse<CaskList>>> => {
  return apiClient.get<ApiResponse<CaskList>>(WHISKEY_API_PATH.CASK.BASE, { params });
};

export const getCaskDetail = (
  caskId: number | string
): Promise<AxiosResponse<ApiResponse<CaskDetail>>> => {
  return apiClient.get<ApiResponse<CaskDetail>>(WHISKEY_API_PATH.CASK.DETAIL(caskId));
};

export const createCask = (data: CreateCaskRequest): Promise<AxiosResponse<CaskDetail>> => {
  return apiClient.post<CaskDetail>(WHISKEY_API_PATH.CASK.BASE, data);
};

export const updateCask = (
  caskId: number | string,
  data: UpdateCaskRequest
): Promise<AxiosResponse<CaskDetail>> => {
  return apiClient.patch<CaskDetail>(WHISKEY_API_PATH.CASK.DETAIL(caskId), data);
};

export const deleteCask = (caskId: number | string): Promise<AxiosResponse<null>> => {
  return apiClient.delete<null>(WHISKEY_API_PATH.CASK.DETAIL(caskId));
};
