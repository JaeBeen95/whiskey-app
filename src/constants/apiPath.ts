export const WHISKEY_API_PATH = {
  AUTH: {
    LOGIN: "/login",
    SIGNUP: "/signup",
  },
  CASK: {
    BASE: "/cask", 
    DETAIL: (caskId: number | string) => `/cask/${caskId}`, 
  },
  CONTAINER: {
    BASE: "/container", 
    DETAIL: (containerId: number | string) => `/container/${containerId}`, 
  },
  EVENT: {
    DELETE: (eventId: number | string) => `/event/${eventId}`, 
    BOTTLING: "/event/bottling",
    REGAUGING: (caskId: number | string) => `/event/regauging/${caskId}`,
    RERACKING: "/event/reracking", 
    SAMPLING: (caskId: number | string) => `/event/sampling/${caskId}`, 
    SPLIT: "/event/split", 
    TRANSFER: "/event/transfer",
  },
  SPIRIT: {
    BASE: "/spirit", 
    DETAIL: (spiritId: number | string) => `/spirit/${spiritId}`,
  },
  USER: {
    ME: "/api/user/me", 
  },
} as const;
