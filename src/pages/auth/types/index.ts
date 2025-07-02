export interface AuthRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export type SignupResponse = boolean;

export interface SignupFormValues {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormValues {
  username: string;
  password: string;
}
