import {
  Squares2X2Icon,
  CubeIcon,
  SparklesIcon,
  UserIcon,
  ArrowRightEndOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

export interface NavLinks {
  to: string;
  icon: React.ReactNode;
  text: string;
  loggedIn?: boolean;
}

export const NAV_LINKS = [
  {
    to: "/dashboard",
    icon: <Squares2X2Icon className="h-6 w-6" />,
    text: "대시보드",
    loggedIn: true,
  },
  {
    to: "/casks",
    icon: <CubeIcon className="h-6 w-6" />,
    text: "캐스크 목록",
    loggedIn: true,
  },
  {
    to: "/containers",
    icon: <CubeIcon className="h-6 w-6" />,
    text: "컨테이너 목록",
    loggedIn: true,
  },
  {
    to: "/spirits",
    icon: <SparklesIcon className="h-6 w-6" />,
    text: "스피릿 목록",
    loggedIn: true,
  },
  {
    to: "/profile",
    icon: <UserIcon className="h-6 w-6" />,
    text: "내 정보",
    loggedIn: true,
  },
  {
    to: "/login",
    icon: <ArrowRightEndOnRectangleIcon className="h-6 w-6" />,
    text: "로그인",
    loggedIn: false,
  },
  {
    to: "/signup",
    icon: <UserPlusIcon className="h-6 w-6" />,
    text: "회원가입",
    loggedIn: false,
  },
] as const;
