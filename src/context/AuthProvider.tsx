import { createContext, useState, type ReactNode } from "react";
import { setAccessToken } from "@/api/client";

interface AuthContextType {
  isLoggedIn: boolean;
  setAuthToken: (token: string | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    () => !!sessionStorage.getItem("accessToken")
  );

  const setAuthToken = (token: string | null) => {
    if (token) {
      sessionStorage.setItem("accessToken", token);
      setAccessToken(token);
      setIsLoggedIn(true);
    } else {
      sessionStorage.removeItem("accessToken");
      setAccessToken(null);
      setIsLoggedIn(false);
    }
  };

  const logout = () => {
    setAuthToken(null);
  };

  const value = { isLoggedIn, setAuthToken, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
