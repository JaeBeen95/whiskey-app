import { useCallback } from "react";
import { useAsyncState } from "@/hooks/useAsyncState";
import type { UseMutationOptions, UseMutationResult } from "@/types/query";

export const useMutation = <TData, TVariables>(
  options: UseMutationOptions<TData, TVariables>
): UseMutationResult<TData, TVariables> => {
  const { mutationFn, onSuccess, onError, onSettled } = options;

  const { data, setData, setStatus, setError, isLoading, isSuccess, isError, status, error } =
    useAsyncState<TData>();

  const mutate = useCallback(
    (
      variables: TVariables,
      callbacks?: {
        onSuccess?: (data: TData, variables: TVariables) => unknown;
        onError?: (error: Error, variables: TVariables) => void;
        onSettled?: (
          data: TData | undefined,
          error: Error | null,
          variables: TVariables
        ) => unknown;
      }
    ): void => {
      const executeMutation = async () => {
        setStatus("loading");
        setError(null);

        let responseData: TData | undefined;
        let caughtError: Error | null = null;

        try {
          const response = await mutationFn(variables);

          if (response.error) {
            throw response.error;
          }

          responseData = response.data;
          setData(responseData);
          setStatus("success");

          await Promise.resolve(
            callbacks?.onSuccess?.(responseData!, variables) ??
              onSuccess?.(responseData!, variables)
          );
        } catch (err) {
          caughtError =
            err instanceof Error ? err : new Error("알 수 없는 데이터 변경 오류가 발생했습니다.");
          setError(caughtError);
          setStatus("error");

          callbacks?.onError?.(caughtError, variables) ?? onError?.(caughtError, variables);
        } finally {
          await Promise.resolve(
            callbacks?.onSettled?.(responseData, caughtError, variables) ??
              onSettled?.(responseData, caughtError, variables)
          );
        }
      };

      executeMutation();
    },
    [mutationFn, onSuccess, onError, onSettled, setData, setStatus, setError]
  );

  return { mutate, data, status, error, isLoading, isSuccess, isError };
};
