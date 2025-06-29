import { useNavigate, Link } from "react-router-dom";
import {
  UserIcon,
  LockClosedIcon,
  ArrowRightEndOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import AuthForm from "./components/AuthForm";
import AuthInput from "./components/AuthInput";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("로그인 시도");
    navigate("/dashboard");
  };

  return (
    <AuthForm title="Whiskey Vault Login" onSubmit={handleLogin}>
      <AuthInput
        id="username"
        label="Username or Email"
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
        <button
          type="submit"
          className="w-full bg-gold-500 text-deep-navy-900 font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline shadow-lg flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-105 hover:brightness-110 hover:shadow-xl"
        >
          <ArrowRightEndOnRectangleIcon className="h-5 w-5 mr-2" />
          로그인
        </button>
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
