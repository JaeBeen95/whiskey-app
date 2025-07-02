import { useNavigate, Link } from "react-router-dom";
import AuthForm from "@/pages/auth/components/AuthForm";
import AuthInput from "@/pages/auth/components/AuthInput";
import Button from "@/components/Button";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserPlusIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useMutation } from "@/hooks/useMutation";
import { signup } from "@/pages/auth/api";
import { useQueryClient } from "@/context/QueryClientProvider";

export default function SignupPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
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

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const usernameInput = form.elements.namedItem("username") as HTMLInputElement;
    const passwordInput = form.elements.namedItem("password") as HTMLInputElement;
    const confirmPasswordInput = form.elements.namedItem("confirm-password") as HTMLInputElement;

    const username = usernameInput?.value || "";
    const password = passwordInput?.value || "";
    const confirmPassword = confirmPasswordInput?.value || "";
    console.log("비밀번호", password);
    console.log("비밀번호 확인", confirmPassword);

    if (password !== confirmPassword) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    if (password.length < 6) {
      alert("비밀번호는 6자 이상이어야 합니다.");
      return;
    }

    if (isLoading) return;
    await mutate({ username, password });
  };

  return (
    <AuthForm title="Create Your Account" onSubmit={handleSignup}>
      <AuthInput
        id="username"
        label="Username"
        type="text"
        placeholder="아이디"
        icon={<EnvelopeIcon className="inline-block h-5 w-5 mr-2" />}
      />
      <AuthInput
        id="password"
        label="Password"
        type="password"
        placeholder="비밀번호"
        icon={<LockClosedIcon className="inline-block h-5 w-5 mr-2" />}
        autocomplete="new-password"
      />
      <AuthInput
        id="confirm-password"
        label="Confirm Password"
        type="password"
        placeholder="비밀번호 확인"
        icon={<LockClosedIcon className="inline-block h-5 w-5 mr-2" />}
        autocomplete="new-password"
      />
      <div className="mb-6">
        <Button type="submit" variant="primary" icon={<UserPlusIcon className="h-5 w-5" />}>
          계정 생성
        </Button>
      </div>
      <div className="flex justify-center items-center gap-x-1 border-t border-gold-500/20 pt-6 mt-6">
        <span className="text-sm text-light-gray-50/80">이미 계정이 있으신가요?</span>
        <Link
          to="/login"
          className="inline-flex items-center font-bold text-sm text-gold-500 hover:text-accent-orange-500 transition-colors duration-200 cursor-pointer"
        >
          <ArrowRightEndOnRectangleIcon className="h-4 w-4 mr-1" />
          로그인
        </Link>
      </div>
    </AuthForm>
  );
}
