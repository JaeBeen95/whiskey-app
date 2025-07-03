
import {
  Squares2X2Icon,
  CubeIcon,
  SparklesIcon,
  UserIcon,
  ArrowRightEndOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

export const navLinks = [
  { to: "/dashboard", icon: <Squares2X2Icon className="h-6 w-6" />, text: "대시보드" },
  { to: "/casks", icon: <CubeIcon className="h-6 w-6" />, text: "캐스크 목록" },
  { to: "/containers", icon: <CubeIcon className="h-6 w-6" />, text: "컨테이너 목록" },
  { to: "/spirits", icon: <SparklesIcon className="h-6 w-6" />, text: "스피릿 목록" },
  { to: "/profile", icon: <UserIcon className="h-6 w-6" />, text: "내 정보" },
  { to: "/login", icon: <ArrowRightEndOnRectangleIcon className="h-6 w-6" />, text: "로그인" },
  { to: "/signup", icon: <UserPlusIcon className="h-6 w-6" />, text: "회원가입" },
];
