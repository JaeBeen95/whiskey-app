import { AuthContext } from "@/context/AuthProvider";
import { useContext } from "react";

export const useAuthState = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthState는 AuthProvider 내부에서 사용해야 합니다 ");
  }

  return context;
};
