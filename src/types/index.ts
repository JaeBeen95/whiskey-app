export interface ApiError extends Error {
  statusCode?: string;
  statusText?: string;
  details?: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error?: ApiError;
}
