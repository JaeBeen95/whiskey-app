import { useQueryClient } from "@/context/QueryClientProvider";
import { useMutation } from "@/hooks/useMutation";
import { useNavigate } from "react-router-dom";
import { createCask, deleteCask, updateCask } from "@/pages/cask/api";
import type { CaskDetail, UpdateCaskRequest } from "@/pages/cask/types";

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

export const useEditCaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<CaskDetail, { caskId: string; data: UpdateCaskRequest }>({
    mutationFn: (variables) => updateCask(variables.caskId, variables.data),
    onSuccess: (updatedCask) => {
      alert(`캐스크 #${updatedCask.caskId} 정보가 수정되었습니다.`);
      queryClient.invalidateQueries({ queryKey: ["cask", updatedCask.caskId] });
      queryClient.invalidateQueries({ queryKey: ["cask"] });
    },
    onError: (error, variables) => {
      const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류";
      alert(`캐스크 #${variables.caskId} 수정에 실패했습니다: ${errorMessage}`);
      console.error("캐스크 수정 에러:", error);
    },
  });
};
