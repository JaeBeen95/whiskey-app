import type { QueryClient } from "@/context/QueryClientProvider";
import type { ApiResponse } from "@/types/api";

export type QueryKey = (string | number | boolean | object | null | undefined)[];
export type SerializedQueryKey = string;

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

export type UseMutationOptions<TData, TVariables> = {
  mutationFn: (variables: TVariables) => Promise<ApiResponse<TData>>;
  onSuccess?: (data: TData, variables: TVariables) => Promise<unknown> | unknown;
  onError?: (error: Error, variables: TVariables) => void;
  onSettled?: (
    data: TData | undefined,
    error: Error | null,
    variables: TVariables
  ) => Promise<unknown> | unknown;
};

export type UseMutationResult<TData, TVariables> = {
  mutate: (
    variables: TVariables,
    callbacks?: {
      onSuccess?: (data: TData, variables: TVariables) => Promise<unknown> | unknown;
      onError?: (error: Error, variables: TVariables) => void;
      onSettled?: (
        data: TData | undefined,
        error: Error | null,
        variables: TVariables
      ) => Promise<unknown> | unknown;
    }
  ) => void;
  data: TData | undefined;
  status: AsyncStatus;
  error: Error | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
};
