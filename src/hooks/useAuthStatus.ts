import { useState, useCallback } from "react";
import { whiskeyAppApiClient } from "@/api/client";

export const useAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!sessionStorage.getItem("accessToken"));

  const setAuthToken = useCallback((token: string | null) => {
    if (token) {
      sessionStorage.setItem("accessToken", token);
      whiskeyAppApiClient.setAccessToken(token);
      setIsLoggedIn(true);
    } else {
      sessionStorage.removeItem("accessToken");
      whiskeyAppApiClient.setAccessToken(null);
      setIsLoggedIn(false);
    }
  }, []);

  const logout = useCallback(() => {
    setAuthToken(null);
  }, [setAuthToken]);

  return { isLoggedIn, setAuthToken, logout };
};
