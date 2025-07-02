import { Link } from "react-router-dom";
import Form from "@/components/Form";
import Button from "@/components/Button";
import FormField from "@/components/FormField";
import {
  EnvelopeIcon,
  UserPlusIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useSignupForm } from "@/pages/auth/hooks/useAuthForm";
import PasswordField from "@/pages/auth/components/PasswordField";

export default function SignupPage() {
  const { register, handleSubmit, errors, isValid, isLoading, passwordWatch } = useSignupForm();

  return (
    <Form title="Create Your Account" onSubmit={handleSubmit}>
      <FormField
        id="username"
        label="Username"
        icon={<EnvelopeIcon className="h-5 w-5" />}
        error={errors.username?.message}
        inputProps={{
          type: "text",
          placeholder: "아이디",
          ...register("username", {
            required: "아이디는 필수입니다.",
            minLength: {
              value: 3,
              message: "아이디는 최소 3자 이상이어야 합니다.",
            },
          }),
        }}
      />
      <PasswordField
        id="password"
        label="Password"
        error={errors.password?.message}
        inputProps={{
          type: "password",
          placeholder: "비밀번호",
          ...register("password", {
            required: "비밀번호는 필수입니다.",
            minLength: {
              value: 8,
              message: "비밀번호는 최소 8자 이상이어야 합니다.",
            },
          }),
        }}
      />
      <PasswordField
        id="confirmPassword"
        label="Confirm Password"
        error={errors.confirmPassword?.message}
        inputProps={{
          type: "password",
          placeholder: "비밀번호 확인",
          ...register("confirmPassword", {
            required: "비밀번호 확인은 필수입니다.",
            validate: (value) => value === passwordWatch || "비밀번호가 일치하지 않습니다.",
          }),
        }}
      />
      <div className="mb-6">
        <Button
          type="submit"
          variant="primary"
          icon={<UserPlusIcon className="h-5 w-5" />}
          disabled={isLoading || !isValid}
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
    </Form>
  );
}
