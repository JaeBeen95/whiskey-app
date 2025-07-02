import { Link } from "react-router-dom";
import { useLoginForm } from "@/pages/auth/hooks/useAuthForm";
import Form from "@/components/Form";
import Button from "@/components/Button";
import {
  UserIcon,
  LockClosedIcon,
  ArrowRightEndOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import FormField from "@/components/FormField";

export default function LoginPage() {
  const { register, handleSubmit, errors, isValid, isLoading } = useLoginForm();

  return (
    <Form title="Whiskey App Login" onSubmit={handleSubmit}>
      <FormField
        id="username"
        label="Username"
        icon={<UserIcon className="inline-block h-5 w-5 mr-2" />}
        error={errors.username?.message}
        inputProps={{
          type: "text",
          placeholder: "사용자 아이디",
          ...register("username", {
            required: "아이디는 필수입니다.",
          }),
        }}
      />
      <FormField
        id="password"
        label="Password"
        icon={<LockClosedIcon className="inline-block h-5 w-5 mr-2" />}
        error={errors.password?.message}
        inputProps={{
          type: "password",
          placeholder: "비밀번호",
          ...register("password", {
            required: "비밀번호는 필수입니다.",
          }),
        }}
      />
      <div className="mb-6">
        <Button
          type="submit"
          variant="primary"
          icon={<ArrowRightEndOnRectangleIcon className="h-5 w-5" />}
          disabled={isLoading || !isValid}
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
    </Form>
  );
}
