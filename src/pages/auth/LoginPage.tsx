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
import Input from "@/components/Input";

export default function LoginPage() {
  //TODO: 아이디 비밀번호 자동완성 시 버튼 활성화 안됨
  const { register, handleSubmit, errors, isValid, isLoading } = useLoginForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-gray-700 p-4 font-sans">
      <Form title="Whiskey App Login" onSubmit={handleSubmit}>
        <FormField label="Username" htmlFor="username" error={errors.username?.message}>
          <Input
            id="username"
            icon={<UserIcon className="h-5 w-5" />}
            hasError={!!errors.username}
            type="text"
            placeholder="사용자 아이디"
            {...register("username")}
          />
        </FormField>
        <FormField label="Password" htmlFor="password" error={errors.password?.message}>
          <Input
            id="password"
            icon={<LockClosedIcon className="h-5 w-5" />}
            hasError={!!errors.password}
            type="password"
            placeholder="비밀번호"
            {...register("password")}
          />
        </FormField>
        <div className="mb-6">
          <Button
            className="w-full"
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
    </div>
  );
}
