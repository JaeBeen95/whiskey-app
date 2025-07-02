import { useState, useMemo } from "react";
import type { AsyncStatus } from "@/types/query";

export function useAsyncState<T>() {
  const [data, setData] = useState<T | undefined>(undefined);
  const [status, setStatus] = useState<AsyncStatus>("idle");
  const [error, setError] = useState<Error | null>(null);

  const computedStates = useMemo(
    () => ({
      isLoading: status === "loading",
      isSuccess: status === "success",
      isError: status === "error",
    }),
    [status]
  );

  return {
    data,
    status,
    error,
    setData,
    setStatus,
    setError,
    ...computedStates,
  };
}
