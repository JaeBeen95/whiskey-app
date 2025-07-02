import type { QueryClient } from "@/context/QueryClientProvider";
import type { ApiResponse } from "@/types/api";

export type QueryKey = string[];

export type AsyncStatus = "idle" | "loading" | "success" | "error";

export interface QueryOptions<TData = unknown> {
  initialData?: TData;
  defaultStaleTime: number;
  defaultGcTime: number;
}

export interface QueryClientConfig {
  staleTime?: number;
  gcTime?: number;
}

export interface QueryClientProviderProps {
  children: React.ReactNode;
  client: QueryClient;
}

export interface UseQueryOptions<TData = unknown> {
  queryKey: QueryKey;
  queryFn: () => Promise<ApiResponse<TData>>;
  enabled?: boolean;
  staleTime?: number;
  gcTime?: number;
}

export interface UseQueryResult<TData = unknown> {
  data: TData | undefined;
  refetch: () => void;
  isStale: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  status: AsyncStatus;
  error: Error | null;
}

export interface UseMutationOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export interface UseMutationResult<T, U> {
  mutate: (
    variables: U,
    callbacks?: {
      onSuccess?: (data: T) => void;
      onError?: (error: Error) => void;
      onSettled?: (data: T | undefined, error: Error | null) => void;
    }
  ) => Promise<ApiResponse<T> | void>;
  data: T | undefined;
  status: AsyncStatus;
  error: Error | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}
