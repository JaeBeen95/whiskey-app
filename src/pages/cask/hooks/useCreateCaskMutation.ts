import { useQueryClient } from "@/context/QueryClientProvider";
import { useMutation } from "@/hooks/useMutation";
import { useNavigate } from "react-router-dom";
import { createCask, deleteCask } from "@/pages/cask/api";

export const useCreateCaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCask,
    onSuccess: async (data) => {
      alert(`${data.caskId} 캐스크가 생성되었습니다.`);
      queryClient.invalidateQueries({ queryKey: ["cask"] });
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류";
      alert(`캐스크 생성에 실패했습니다: ${errorMessage}`);
    },
  });
};

export const useDeleteCaskMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<null, number | string>({
    mutationFn: deleteCask,

    onSuccess: (_, deletedCaskId: number | string) => {
      alert(`${deletedCaskId}번 캐스크가 삭제되었습니다.`);
      queryClient.invalidateQueries({ queryKey: ["cask"] });
      navigate("/casks");
    },

    onError: (error: Error, caskId: number | string) => {
      const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류";
      alert(`${caskId}번 캐스크 삭제에 실패했습니다: ${errorMessage}`);
      console.error("캐스크 삭제 에러:", error);
    },
  });
};
