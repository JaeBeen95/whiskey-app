import axios, { type AxiosInstance, type AxiosError } from "axios";
import type { ApiError } from "@/types/api";

const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  throw new Error("VITE_API_BASE_URL이 .env.local 파일에 설정되지 않았습니다.");
}

const apiClient: AxiosInstance = axios.create({
  baseURL,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem("accessToken");
      alert("세션이 만료되었습니다. 다시 로그인해주세요.");
      window.location.href = "/login";
    }

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
  const apiError: ApiError = new Error("API 요청 중에 오류가 발생했습니다.") as ApiError;

  if (error.response) {
    apiError.message = error.response.statusText || "서버 응답 에러";
    apiError.statusCode = error.response.status;
    apiError.details = JSON.stringify(error.response.data || {});
  } else if (error.request) {
    apiError.statusText = "네트워크 연결 문제";
    apiError.details =
      "서버로부터 응답을 받지 못했거나 요청이 취소되었습니다. 인터넷 연결을 확인해주세요.";
  } else {
    apiError.statusText = "요청 처리 중 예기치 않은 오류";
    apiError.details = error.message;
  }

  return apiError;
};

export default apiClient;
