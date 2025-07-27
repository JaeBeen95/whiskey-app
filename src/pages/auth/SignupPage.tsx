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
import Input from "@/components/Input";

export default function SignupPage() {
  const { register, handleSubmit, errors, isValid, isLoading } = useSignupForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-gray-700 p-4 font-sans">
      <Form title="Create Your Account" onSubmit={handleSubmit}>
        <FormField label="Username" htmlFor="username" error={errors.username?.message}>
          <Input
            id="username"
            icon={<EnvelopeIcon className="h-5 w-5" />}
            hasError={!!errors.username}
            type="text"
            placeholder="사용자 아이디"
            {...register("username")}
          />
        </FormField>

        <PasswordField
          label="Password"
          error={errors.password?.message}
          inputProps={{
            placeholder: "비밀번호",
            ...register("password"),
          }}
        />
        <PasswordField
          label="Confirm Password"
          error={errors.confirmPassword?.message}
          inputProps={{
            placeholder: "비밀번호 확인",
            ...register("confirmPassword"),
          }}
        />
        <div className="mb-6">
          <Button
            className="w-full"
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
    </div>
  );
}
