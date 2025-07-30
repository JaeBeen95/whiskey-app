import { UserIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function UserPage() {
  const user = {
    username: "whiskey_master",
    roles: ["ADMIN", "USER"],
  };

  return (
    <div className="p-8 bg-parchment min-h-[calc(100vh-80px)] text-deep-brown flex justify-center items-center">
      <div className="bg-parchment-light p-8 rounded-2xl shadow-xl max-w-md w-full border border-deep-brown/10">
        <h1 className="text-4xl font-serif text-amber text-center mb-8">사용자 정보</h1>
        <div className="space-y-4 text-lg">
          <div className="flex items-center">
            <UserIcon className="h-6 w-6 text-amber mr-3" />
            <span className="font-bold">사용자 이름:</span>{" "}
            <span className="ml-2 font-sans">{user.username}</span>
          </div>
          <div className="flex items-center">
            <UserGroupIcon className="h-6 w-6 text-amber mr-3" />
            <span className="font-bold">역할:</span>
            <ul className="flex flex-wrap gap-2 ml-2">
              {user.roles.map((role, index) => (
                <li
                  key={index}
                  className="bg-deep-brown text-parchment-light px-3 py-1 rounded-full text-sm font-sans"
                >
                  {role}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link to="/" className="inline-flex items-center text-amber hover:text-copper font-bold">
            <span className="mr-1">&larr;</span> 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
