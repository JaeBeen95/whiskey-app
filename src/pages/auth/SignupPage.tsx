import { Link } from "react-router-dom";
import AuthForm from "@/pages/auth/components/AuthForm";
import AuthInput from "@/pages/auth/components/AuthInput";
import Button from "@/components/Button";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserPlusIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useSignupForm } from "@/pages/auth/hooks/useAuthForm";

export default function SignupPage() {
  const { handleSubmit, isLoading } = useSignupForm();

  return (
    <AuthForm title="Create Your Account" onSubmit={handleSubmit}>
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
        <Button
          type="submit"
          variant="primary"
          icon={<UserPlusIcon className="h-5 w-5" />}
          disabled={isLoading}
        >
          회원가입
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
