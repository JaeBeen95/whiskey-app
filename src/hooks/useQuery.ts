import { useState, useEffect, useCallback } from "react";
import { useQueryClient } from "@/context/QueryClientProvider";
import { useAsyncState } from "@/hooks/useAsyncState";
import type { UseQueryOptions, UseQueryResult } from "@/types/query";

export function useQuery<T>(options: UseQueryOptions<T>): UseQueryResult<T> {
  const { queryKey, queryFn, enabled = true, staleTime, gcTime } = options;

  const queryClient = useQueryClient();

  const { data, setData, status, setStatus, error, setError, isLoading, isSuccess, isError } =
    useAsyncState<T>();
  const [isStale, setIsStale] = useState(false);

  const fetchData = useCallback(async () => {
    const queryInstance = queryClient["ensureQuery"]<T>(queryKey, {
      staleTime: staleTime,
      gcTime: gcTime,
    });
    const cachedData = queryClient.getQueryData<T>(queryKey);

    setIsStale(queryInstance.state.isStale);

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
      const response = await queryFn();
      if (signal.aborted) return;

      if (!response.error && response.data !== undefined) {
        const actualData: T = response.data;

        queryClient.setQueryData<T>(queryKey, actualData);
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
  }, [queryKey, queryClient, data, setData, setStatus, setError, staleTime, gcTime, queryFn]);

  useEffect(() => {
    if (enabled) {
      fetchData();
    } else {
      setStatus("idle");
    }
  }, [enabled, fetchData, setStatus]);

  useEffect(() => {
    const listener = () => {
      const latestCachedData = queryClient.getQueryData<T>(queryKey);
      const queryInstance = queryClient["ensureQuery"]<T>(queryKey);

      const isLatestDataStale = queryInstance.state.isStale;

      if (data !== latestCachedData || isStale !== isLatestDataStale) {
        setData(latestCachedData);
        setIsStale(isLatestDataStale);

        if (isLatestDataStale && !isLoading && enabled) {
          fetchData();
        }
      }
    };

    queryClient.subscribe(queryKey, listener);
    return () => {
      queryClient.unsubscribe(queryKey, listener);
    };
  }, [queryClient, queryKey, data, isStale, setData, fetchData, isLoading, enabled]);

  const refetch = useCallback(() => {
    setStatus("loading");
    fetchData();
  }, [fetchData, setStatus]);

  return { data, refetch, isStale, isLoading, isSuccess, isError, status, error };
}
