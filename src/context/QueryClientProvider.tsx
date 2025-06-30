import { createContext, useContext, type ReactNode } from "react";

type QueryKey = (string | number | object)[];

interface QueryClientConfig {
  staleTime?: number;
  gcTime?: number;
}

interface QueryOptions<TData> {
  initialData?: TData;
  defaultStaleTime: number;
  defaultGcTime: number;
}

class Query<TData = unknown> {
  state: {
    data: TData | undefined;
    updatedAt: number;
    isStale: boolean;
  };
  private gcTimer?: NodeJS.Timeout;
  private staleTimer?: NodeJS.Timeout;
  private defaultGcTime: number;
  private defaultStaleTime: number;

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

  setData(newData: TData | undefined) {
    this.state.data = newData;
    this.state.updatedAt = Date.now();
    this.state.isStale = false;
    this.startStaleTimer();
    this.clearGcTimer();
  }

  invalidate() {
    this.state.isStale = true;
    if (this.staleTimer) {
      clearTimeout(this.staleTimer);
      this.staleTimer = undefined;
    }
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
    if (this.staleTimer) {
      clearTimeout(this.staleTimer);
    }
    if (this.defaultStaleTime !== Infinity) {
      this.staleTimer = setTimeout(() => {
        this.state.isStale = true;
      }, this.defaultStaleTime);
    }
  }
}

interface QueryClientProviderProps {
  children: ReactNode;
  client: QueryClient;
}

export class QueryClient {
  private queryCache = new Map<string, Query<unknown>>();
  private querySubscribers = new Map<string, Set<() => void>>();
  private defaultStaleTime: number;
  private defaultGcTime: number;

  constructor(config?: QueryClientConfig) {
    this.defaultStaleTime = config?.staleTime ?? 0;
    this.defaultGcTime = config?.gcTime ?? 5 * 60 * 1000;
  }

  private ensureQuery<TData>(queryKey: QueryKey, initialData?: TData): Query<TData> {
    const serializedKey = JSON.stringify(queryKey);
    if (!this.queryCache.has(serializedKey)) {
      const query = new Query<TData>({
        initialData,
        defaultGcTime: this.defaultGcTime,
        defaultStaleTime: this.defaultStaleTime,
      });
      this.queryCache.set(serializedKey, query);
    }
    return this.queryCache.get(serializedKey) as Query<TData>;
  }

  invalidateQueries(queryKey: QueryKey) {
    const serializedKey = JSON.stringify(queryKey);
    const query = this.queryCache.get(serializedKey);
    if (query) {
      query.invalidate();
      const subscribers = this.querySubscribers.get(serializedKey);
      if (subscribers) {
        subscribers.forEach((callback) => callback());
      }
    }
  }

  subscribe(queryKey: QueryKey, refetch: () => void) {
    const serializedKey = JSON.stringify(queryKey);
    if (!this.querySubscribers.has(serializedKey)) {
      this.querySubscribers.set(serializedKey, new Set());
    }
    this.querySubscribers.get(serializedKey)!.add(refetch);

    const query = this.queryCache.get(serializedKey);
    if (query) {
      query.clearGcTimer();
    }
  }

  unsubscribe(queryKey: QueryKey, refetch: () => void) {
    const serializedKey = JSON.stringify(queryKey);
    const subscribers = this.querySubscribers.get(serializedKey);
    if (subscribers) {
      subscribers.delete(refetch);
      if (subscribers.size === 0) {
        this.querySubscribers.delete(serializedKey);
        const query = this.queryCache.get(serializedKey);
        if (query) {
          query.setGcTimer(() => {
            this.queryCache.delete(serializedKey);
          });
        }
      }
    }
  }

  setQueryData<TData>(
    queryKey: QueryKey,
    updater: TData | ((oldData: TData | undefined) => TData)
  ) {
    const serializedKey = JSON.stringify(queryKey);

    const query = this.ensureQuery<TData>(queryKey);

    let newData: TData | undefined;
    if (typeof updater === "function") {
      const updateFn = updater as (oldData: TData | undefined) => TData;
      newData = updateFn(query.state.data);
    } else {
      newData = updater;
    }

    query.setData(newData);

    const subscribers = this.querySubscribers.get(serializedKey);
    if (subscribers) {
      subscribers.forEach((callback) => callback());
    }
  }

  getQueryData<TData>(queryKey: QueryKey): TData | undefined {
    const serializedKey = JSON.stringify(queryKey);
    const query = this.queryCache.get(serializedKey);
    return query ? (query.state.data as TData) : undefined;
  }
}

const QueryClientContext = createContext<QueryClient | undefined>(undefined);

export function QueryClientProvider({ children, client }: QueryClientProviderProps) {
  return <QueryClientContext.Provider value={client}>{children}</QueryClientContext.Provider>;
}

export function useQueryClient() {
  const client = useContext(QueryClientContext);
  if (client === undefined) {
    throw new Error("useQueryClient은 QueryClientProvider 내부에서 사용해야 합니다");
  }
  return client;
}
