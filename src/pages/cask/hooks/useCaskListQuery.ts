import { useQuery } from "@/hooks/useQuery";
import { getCaskList } from "@/pages/cask/api";
import type { CaskList, GetCaskListParams } from "@/pages/cask/types";
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
