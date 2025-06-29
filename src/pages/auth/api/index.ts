import { whiskeyAppApiClient } from "@/api/client";
import { WHISKEY_API_PATH } from "@/pages/constants";
import type { ApiResponse } from "@/types";

interface AuthRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
}

type SignupResponse = boolean;

export const login = (credentials: AuthRequest): Promise<ApiResponse<LoginResponse>> => {
  return whiskeyAppApiClient.post<LoginResponse, AuthRequest>(
    WHISKEY_API_PATH.AUTH.LOGIN,
    credentials
  );
};

export const signup = (credentials: AuthRequest): Promise<ApiResponse<SignupResponse>> => {
  return whiskeyAppApiClient.post<SignupResponse, AuthRequest>(
    WHISKEY_API_PATH.AUTH.SIGNUP,
    credentials
  );
};
