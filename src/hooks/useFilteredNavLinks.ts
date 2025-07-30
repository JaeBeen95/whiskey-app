import { NAV_LINKS, type NavLinks } from "@/constants/navLinks";
import { useAuthState } from "@/hooks/useAuthState";

export const useFilteredNavLinks = (): NavLinks[] => {
  const { isLoggedIn } = useAuthState();

  const filteredNavLinks = NAV_LINKS.filter((link) => {
    if (link.loggedIn === undefined) {
      return true;
    }
    return link.loggedIn === isLoggedIn;
  });

  return filteredNavLinks;
};
