import axios, { type AxiosInstance, type AxiosError } from "axios";
import type { ApiError } from "@/types/api";

const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  throw new Error("VITE_API_BASE_URL이 .env.local 파일에 설정되지 않았습니다.");
}

const apiClient: AxiosInstance = axios.create({
  baseURL,
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export const setAccessToken = (token: string | null) => {
  if (token) {
    sessionStorage.setItem("accessToken", token);
  } else {
    sessionStorage.removeItem("accessToken");
  }
};

export const createApiError = (error: AxiosError): ApiError => {
  const apiError: ApiError = new Error("API 요청 실패") as ApiError;

  if (error.response) {
    apiError.statusCode = `${error.response.status}`;
    apiError.statusText = error.response.statusText;
    apiError.details = JSON.stringify(error.response.data || {});
  } else if (error.request) {
    apiError.statusCode = "네트워크 오류";
    apiError.statusText = "네트워크 연결 문제";
    apiError.details =
      "서버로부터 응답을 받지 못했거나 요청이 취소되었습니다. 인터넷 연결을 확인해주세요.";
  } else {
    apiError.statusCode = "요청 설정 오류";
    apiError.statusText = "요청 처리 중 예기치 않은 오류";
    apiError.details = error.message;
  }

  return apiError;
};

export default apiClient;
