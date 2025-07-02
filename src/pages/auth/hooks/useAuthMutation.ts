import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@/context/QueryClientProvider";
import { useMutation } from "@/hooks/useMutation";
import { login, signup } from "@/pages/auth/api";

export const useSignupMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries(["me"]);
      alert("회원가입 성공");
      navigate("/login");
    },
    onError: (err) => {
      alert(`회원가입 실패: ${err.message}`);
    },
  });
};

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries(["me"]);
      navigate("/dashboard");
    },
    onError: (err) => {
      alert(`로그인 실패: ${err.message}`);
    },
  });
};
