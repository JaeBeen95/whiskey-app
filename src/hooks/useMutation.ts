import { useCallback } from "react";
import { useAsyncState } from "@/hooks/useAsyncState";
import type { ApiResponse } from "@/types/api";
import type { UseMutationOptions, UseMutationResult } from "@/types/query";

export function useMutation<T, U>(
  mutationFn: (variables: U) => Promise<ApiResponse<T>>,
  options?: UseMutationOptions<T>
): UseMutationResult<T, U> {
  const { data, setData, setStatus, setError, isLoading, isSuccess, isError, status, error } =
    useAsyncState<T>();

  const mutate = useCallback(
    async (
      variables: U,
      callbacks?: {
        onSuccess?: (data: T) => void;
        onError?: (error: Error) => void;
        onSettled?: (data: T | undefined, error: Error | null) => void;
      }
    ) => {
      setStatus("loading");
      setError(null);

      let responseData: T | undefined;
      let caughtError: Error | null = null;

      try {
        const response = await mutationFn(variables);

        if (response.error) {
          throw response.error;
        }

        responseData = response.data;
        setData(responseData);
        setStatus("success");

        if (responseData !== undefined) {
          options?.onSuccess?.(responseData);
          callbacks?.onSuccess?.(responseData);
        }

        return response;
      } catch (err) {
        caughtError =
          err instanceof Error ? err : new Error("알 수 없는 데이터 변경 오류가 발생했습니다.");
        setError(caughtError);
        setStatus("error");

        options?.onError?.(caughtError);
        callbacks?.onError?.(caughtError);
      } finally {
        callbacks?.onSettled?.(responseData, caughtError);
      }
    },
    [mutationFn, options, setData, setStatus, setError]
  );

  return { mutate, data, status, error, isLoading, isSuccess, isError };
}
