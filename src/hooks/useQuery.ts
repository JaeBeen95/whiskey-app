import { useEffect, useCallback, useRef } from "react";
import { useQueryClient } from "@/context/QueryClientProvider";
import { useAsyncState } from "@/hooks/useAsyncState";
import type { UseQueryOptions, UseQueryResult } from "@/types/query";

export const useQuery = <T>(options: UseQueryOptions<T>): UseQueryResult<T> => {
  const { queryKey, queryFn, enabled = true, staleTime, gcTime } = options;

  const queryClient = useQueryClient();
  const serializedKey = queryClient.getQueryKey(queryKey);
  const queryInstance = queryClient.ensureQuery<T>(serializedKey, {
    staleTime,
    gcTime,
  });

  const { data, setData, status, setStatus, error, setError, isLoading, isSuccess, isError } =
    useAsyncState<T>();

  const queryFnRef = useRef(queryFn);
  useEffect(() => {
    queryFnRef.current = queryFn;
  });

  const dataRef = useRef(data);
  useEffect(() => {
    dataRef.current = data;
  });

  const fetchData = useCallback(async () => {
    const cachedData = queryClient.getQueryData<T>(serializedKey);

    const isDataFresh = !queryInstance.state.isStale;

    if (cachedData !== undefined && isDataFresh) {
      if (data !== cachedData) {
        setData(cachedData);
      }
      setStatus("success");
      return;
    }

    setStatus("loading");
    setError(null);

    const abortController = new AbortController();
    const { signal } = abortController;

    try {
      const response = await queryFnRef.current();
      if (signal.aborted) return;

      if (!response.error && response.data !== undefined) {
        const actualData: T = response.data;

        queryClient.setQueryData<T>(serializedKey, actualData);
        setData(actualData);
        setStatus("success");
      } else if (response.error) {
        setError(response.error || new Error("알 수 없는 API 오류가 발생했습니다."));
        setStatus("error");
      } else {
        setData(undefined);
        setStatus("success");
      }
    } catch (err) {
      if (signal.aborted) return;
      setError(err instanceof Error ? err : new Error("알 수 없는 오류가 발생했습니다."));
      setStatus("error");
    }

    return () => {
      abortController.abort();
    };
  }, [serializedKey, queryClient, setData, setStatus, setError]);

  useEffect(() => {
    if (enabled) {
      fetchData();
    } else {
      setStatus("idle");
    }
  }, [enabled, setStatus, fetchData]);

  useEffect(() => {
    const listener = () => {
      const latestCachedData = queryClient.getQueryData<T>(serializedKey);

      if (dataRef.current !== latestCachedData) {
        setData(latestCachedData);

        if (queryInstance.state.isStale && !isLoading && enabled) {
          fetchData();
        }
      }
    };

    queryClient.subscribe(serializedKey, listener);
    return () => {
      queryClient.unsubscribe(serializedKey, listener);
    };
  }, [queryClient, serializedKey, data, fetchData, isLoading, enabled]);

  const refetch = useCallback(() => {
    setStatus("loading");
    fetchData();
  }, [fetchData, setStatus]);

  return {
    data,
    refetch,
    isStale: queryInstance.state.isStale,
    isLoading,
    isSuccess,
    isError,
    status,
    error,
  };
};
