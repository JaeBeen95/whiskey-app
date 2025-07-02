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
  const { register, handleSubmit, errors, isLoading, passwordWatch } = useSignupForm();

  return (
    <AuthForm title="Create Your Account" onSubmit={handleSubmit}>
      <AuthInput
        id="username"
        label="Username"
        type="text"
        placeholder="아이디"
        icon={<EnvelopeIcon className="inline-block h-5 w-5 mr-2" />}
        registerProps={register("username", {
          required: "아이디는 필수입니다.",
          minLength: {
            value: 4,
            message: "아이디는 최소 4자 이상이어야 합니다."
          }
        })}
        error={errors.username?.message}
      />
      <AuthInput
        id="password"
        label="Password"
        type="password"
        placeholder="비밀번호"
        icon={<LockClosedIcon className="inline-block h-5 w-5 mr-2" />}
        autocomplete="new-password"
        registerProps={register("password", {
          required: "비밀번호는 필수입니다.",
          minLength: {
            value: 8,
            message: "비밀번호는 최소 8자 이상이어야 합니다."
          }
        })}
        error={errors.password?.message}
      />
      <AuthInput
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        placeholder="비밀번호 확인"
        icon={<LockClosedIcon className="inline-block h-5 w-5 mr-2" />}
        autocomplete="new-password"
        registerProps={register("confirmPassword", {
          required: "비밀번호 확인은 필수입니다.",
          validate: (value) =>
            value === passwordWatch || "비밀번호가 일치하지 않습니다.",
        })}
        error={errors.confirmPassword?.message}
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