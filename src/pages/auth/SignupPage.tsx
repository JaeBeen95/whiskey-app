import { useNavigate, Link } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import AuthInput from "./components/AuthInput";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserPlusIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function SignupPage() {
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("회원가입 시도");
    navigate("/login");
  };

  return (
    <AuthForm title="Create Your Account" onSubmit={handleSignup}>
      <AuthInput
        id="email"
        label="Email"
        type="email"
        placeholder="이메일"
        icon={<EnvelopeIcon className="inline-block h-5 w-5 mr-2" />}
      />
      <AuthInput
        id="new-password"
        label="Password"
        type="password"
        placeholder="비밀번호"
        icon={<LockClosedIcon className="inline-block h-5 w-5 mr-2" />}
      />
      <AuthInput
        id="confirm-password"
        label="Confirm Password"
        type="password"
        placeholder="비밀번호 확인"
        icon={<LockClosedIcon className="inline-block h-5 w-5 mr-2" />}
      />
      <div className="mb-6">
        <button
          type="submit"
          className="w-full bg-gold-500 text-deep-navy-900 font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline shadow-lg flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-105 hover:brightness-110 hover:shadow-xl"
        >
          <UserPlusIcon className="h-5 w-5 mr-2" />
          계정 생성
        </button>
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
