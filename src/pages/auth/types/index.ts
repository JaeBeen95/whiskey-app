export interface AuthRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export type SignupResponse = boolean;