export interface ApiError extends Error {
  code?: string;
  message: string;
  statusCode?: string;
  statusText?: string;
  details?: string;
}

export interface ApiResponse<T> {
  data: T | undefined;
  error?: ApiError;
  messages?: string;
  code?: number;
}
