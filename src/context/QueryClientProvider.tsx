import { createContext, useContext } from "react";
import type {
  QueryKey,
  QueryClientConfig,
  QueryOptions,
  QueryClientProviderProps,
  SerializedQueryKey,
} from "@/types/query";

class QueryState<TData = unknown> {
  state: {
    data: TData | undefined;
    updatedAt: number;
    isStale: boolean;
  };
  private gcTimer?: NodeJS.Timeout;
  private staleTimer?: NodeJS.Timeout;
  private readonly defaultGcTime: number;
  private readonly defaultStaleTime: number;

  constructor(options: QueryOptions<TData>) {
    const { initialData, defaultStaleTime, defaultGcTime } = options;

    this.defaultStaleTime = defaultStaleTime;
    this.defaultGcTime = defaultGcTime;
    this.state = {
      data: initialData,
      updatedAt: Date.now(),
      isStale: false,
    };
    this.startStaleTimer();
  }

  setQueryState(newData: TData | undefined) {
    this.state.data = newData;
    this.state.updatedAt = Date.now();
    this.state.isStale = false;
    this.startStaleTimer();
    this.clearGcTimer();
  }

  invalidate() {
    this.state.isStale = true;
    this.clearStaleTimer();
  }

  setGcTimer(callback: () => void) {
    this.clearGcTimer();
    this.gcTimer = setTimeout(callback, this.defaultGcTime);
  }

  clearGcTimer() {
    if (this.gcTimer) {
      clearTimeout(this.gcTimer);
      this.gcTimer = undefined;
    }
  }

  private startStaleTimer() {
    this.clearStaleTimer();
    if (this.defaultStaleTime !== Infinity) {
      this.staleTimer = setTimeout(() => {
        this.state.isStale = true;
      }, this.defaultStaleTime);
    }
  }

  private clearStaleTimer() {
    if (this.staleTimer) {
      clearTimeout(this.staleTimer);
      this.staleTimer = undefined;
    }
  }
}

export class QueryClient {
  private readonly queryCache = new Map<string, QueryState<unknown>>();
  private readonly querySubscribers = new Map<string, Set<() => void>>();
  private readonly defaultStaleTime: number;
  private readonly defaultGcTime: number;

  constructor(config?: QueryClientConfig) {
    this.defaultStaleTime = config?.staleTime ?? 0;
    this.defaultGcTime = config?.gcTime ?? 5 * 60 * 1000;
  }

  getQueryKey(queryKey: QueryKey): string {
    return JSON.stringify(queryKey);
  }

  getQueryData<TData>(queryKey: SerializedQueryKey): TData | undefined {
    const queryCache = this.queryCache.get(queryKey);
    return queryCache?.state.data as TData | undefined;
  }

  setQueryData<TData>(
    queryKey: SerializedQueryKey,
    updater: TData | ((oldData: TData | undefined) => TData)
  ) {
    const queryState = this.ensureQuery<TData>(queryKey);

    const newData =
      typeof updater === "function"
        ? (updater as (oldData: TData | undefined) => TData)(queryState.state.data)
        : updater;

    queryState.setQueryState(newData);
    this.notifySubscribers(queryKey);
  }

  invalidateQueries(queryKey: SerializedQueryKey) {
    const queryState = this.queryCache.get(queryKey);
    if (queryState) {
      queryState.invalidate();
      this.notifySubscribers(queryKey);
    }
  }

  subscribe(queryKey: SerializedQueryKey, callback: () => void) {
    if (!this.querySubscribers.has(queryKey)) {
      this.querySubscribers.set(queryKey, new Set());
    }
    this.querySubscribers.get(queryKey)!.add(callback);

    this.queryCache.get(queryKey)?.clearGcTimer();
  }

  unsubscribe(queryKey: SerializedQueryKey, callback: () => void) {
    const subscribers = this.querySubscribers.get(queryKey);
    if (!subscribers) return;

    subscribers.delete(callback);
    if (subscribers.size === 0) {
      this.querySubscribers.delete(queryKey);
      const query = this.queryCache.get(queryKey);
      query?.setGcTimer(() => {
        this.queryCache.delete(queryKey);
      });
    }
  }

  ensureQuery<TData>(
    queryKey: SerializedQueryKey,
    options?: { staleTime?: number; gcTime?: number }
  ): QueryState<TData> {
    if (!this.queryCache.has(queryKey)) {
      const newQueryState = new QueryState<TData>({
        initialData: undefined,
        defaultGcTime: options?.gcTime ?? this.defaultGcTime,
        defaultStaleTime: options?.staleTime ?? this.defaultStaleTime,
      });
      this.queryCache.set(queryKey, newQueryState);
    }
    return this.queryCache.get(queryKey) as QueryState<TData>;
  }

  private notifySubscribers(queryKey: string) {
    const subscribers = this.querySubscribers.get(queryKey);
    subscribers?.forEach((callback) => callback());
  }
}

const QueryClientContext = createContext<QueryClient | undefined>(undefined);

export function QueryClientProvider({ children, client }: QueryClientProviderProps) {
  return <QueryClientContext.Provider value={client}>{children}</QueryClientContext.Provider>;
}

export function useQueryClient() {
  const client = useContext(QueryClientContext);
  if (!client) {
    throw new Error("useQueryClient는 QueryClientProvider 내부에서 사용해야 합니다");
  }
  return client;
}
