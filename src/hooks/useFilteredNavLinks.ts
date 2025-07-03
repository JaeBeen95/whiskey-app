import { useMemo } from "react";
import { NAV_LINKS, type NavLinks } from "@/constants/navLinks";
import { useAuthStatus } from "@/hooks/useAuthStatus";

export const useFilteredNavLinks = (): NavLinks[] => {
  const { isLoggedIn } = useAuthStatus();

  const filteredNavLinks = useMemo(() => {
    return NAV_LINKS.filter((link) => {
      if (link.loggedIn === undefined) {
        return true;
      }
      return link.loggedIn === isLoggedIn;
    });
  }, [isLoggedIn]);

  return filteredNavLinks;
};
