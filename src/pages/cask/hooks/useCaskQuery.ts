import { useQuery } from "@/hooks/useQuery";
import { getCaskList, getCaskDetail } from "@/pages/cask/api";
import type { CaskDetail, CaskList, GetCaskListParams } from "@/pages/cask/types";
import type { ApiResponse } from "@/types/api";

export const useCaskListQuery = (params?: Partial<GetCaskListParams>) => {
  const defaultPage = 1;
  const defaultSize = 10;

  const { page, size, sort, ...searchDto } = params || {};

  const requestParams: GetCaskListParams = {
    page: page ?? defaultPage,
    size: size ?? defaultSize,
    sort: sort,
    ...searchDto,
  };

  const { data, isLoading, error } = useQuery<ApiResponse<CaskList>>({
    queryKey: ["cask", requestParams],
    queryFn: () => getCaskList(requestParams),
  });

  const caskListData: CaskList | undefined = data?.data;
  const caskContentList = caskListData?.content;

  return { data: caskContentList, isLoading, error };
};

export const useCaskDetailQuery = (caskId: number | string) => {
  const {
    data: caskDetailData,
    isLoading,
    error,
  } = useQuery<ApiResponse<CaskDetail>>({
    queryKey: ["caskDetail", caskId],
    queryFn: () => getCaskDetail(caskId),
  });

  const caskDetail: CaskDetail | undefined = caskDetailData?.data;

  return { data: caskDetail, isLoading, error };
};
