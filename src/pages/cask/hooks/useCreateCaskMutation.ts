import { useQueryClient } from "@/context/QueryClientProvider";
import { useMutation } from "@/hooks/useMutation";
import { createCask } from "@/pages/cask/api";

export const useCreateCaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCask,
    onSuccess: (data) => {
      alert(`${data.cask_id} 캐스크가 성공적으로 생성되었습니다.`);

      queryClient.invalidateQueries({ queryKey: ["cask"] });
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류";
      alert(`캐스크 생성에 실패했습니다: ${errorMessage}`);
    },
  });
};
