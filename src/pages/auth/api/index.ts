import apiClient from "@/api/client";
import { WHISKEY_API_PATH } from "@/constants/apiPath";
import type { AuthRequest, LoginResponse, SignupResponse } from "@/pages/auth/types";
import type { AxiosResponse } from "axios";

export const login = (credentials: AuthRequest): Promise<AxiosResponse<LoginResponse>> => {
  return apiClient.post<LoginResponse>(WHISKEY_API_PATH.AUTH.LOGIN, credentials);
};

export const signup = (credentials: AuthRequest): Promise<AxiosResponse<SignupResponse>> => {
  return apiClient.post<SignupResponse>(WHISKEY_API_PATH.AUTH.SIGNUP, credentials);
};
