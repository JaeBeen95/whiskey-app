import axios, { type AxiosInstance, type AxiosResponse, type AxiosError } from "axios";

interface ApiError extends Error {
  statusCode?: string;
  statusText?: string;
  details?: string;
}

interface ApiResponse<T> {
  data: T | null;
  error?: ApiError;
}

class ApiClient {
  private axiosInstance: AxiosInstance;
  private accessToken: string | null = null;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  }

  public setAccessToken(token: string | null) {
    this.accessToken = token;
  }

  private createApiError(error: AxiosError): ApiError {
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
  }

  private async request<T>(axiosCall: Promise<AxiosResponse<T>>): Promise<ApiResponse<T>> {
    try {
      const response = await axiosCall;
      return {
        data: response.data,
      };
    } catch (axiosError) {
      const apiError = this.createApiError(axiosError as AxiosError);
      return {
        data: null,
        error: apiError,
      };
    }
  }

  async get<T>(endpoint: string, params?: Record<string, unknown>): Promise<ApiResponse<T>> {
    return this.request(this.axiosInstance.get<T>(endpoint, { params }));
  }

  async post<T, U = unknown>(endpoint: string, body?: U): Promise<ApiResponse<T>> {
    return this.request(this.axiosInstance.post<T>(endpoint, body));
  }

  async patch<T, U = unknown>(endpoint: string, body?: U): Promise<ApiResponse<T>> {
    return this.request(this.axiosInstance.patch<T>(endpoint, body));
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request(this.axiosInstance.delete<T>(endpoint));
  }
}

const baseUrl = import.meta.env.VITE_API_BASE_URL;

if (!baseUrl) {
  throw new Error("VITE_API_BASE_URL이 .env.local 파일에 설정되지 않았습니다.");
}

export const whiskeyAppApiClient = new ApiClient(baseUrl);
