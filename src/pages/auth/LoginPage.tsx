import { useNavigate, Link } from "react-router-dom";
import { useQueryClient } from "@/context/QueryClientProvider";
import { useMutation } from "@/hooks/useMutation";
import { login } from "@/pages/auth/api";
import AuthForm from "@/pages/auth/components/AuthForm";
import AuthInput from "@/pages/auth/components/AuthInput";
import Button from "@/components/Button";
import {
  UserIcon,
  LockClosedIcon,
  ArrowRightEndOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

export default function LoginPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries(["me"]);
      navigate("/dashboard");
    },
    onError: (err) => {
      alert(`로그인 실패: ${err.message}`);
    },
  });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const usernameInput = form.elements.namedItem("username") as HTMLInputElement;
    const passwordInput = form.elements.namedItem("password") as HTMLInputElement;

    const username = usernameInput?.value || "";
    const password = passwordInput?.value || "";

    if (isLoading) return;
    mutate({ username, password });
  };

  return (
    <AuthForm title="Whiskey App Login" onSubmit={handleLogin}>
      <AuthInput
        id="username"
        label="Username"
        type="text"
        placeholder="사용자 아이디"
        icon={<UserIcon className="inline-block h-5 w-5 mr-2" />}
      />
      <AuthInput
        id="password"
        label="Password"
        type="password"
        placeholder="비밀번호"
        icon={<LockClosedIcon className="inline-block h-5 w-5 mr-2" />}
      />
      <div className="mb-6">
        <Button
          type="submit"
          variant="primary"
          icon={<ArrowRightEndOnRectangleIcon className="h-5 w-5" />}
        >
          로그인
        </Button>
      </div>
      <div className="flex justify-center items-center gap-x-1 border-t border-gold-500/20 pt-6 mt-6">
        <span className="text-sm text-light-gray-50/80">회원이 아니신가요?</span>
        <Link
          to="/signup"
          className="inline-flex items-center font-bold text-sm text-gold-500 hover:text-accent-orange-500 transition-colors duration-200 cursor-pointer"
        >
          <UserPlusIcon className="h-4 w-4 mr-1" />
          회원가입
        </Link>
      </div>
    </AuthForm>
  );
}
