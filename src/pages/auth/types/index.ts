export interface AuthRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export type SignupResponse = boolean; 

export interface SignupFormValues extends AuthRequest {
  confirmPassword: string;
}

export type LoginFormValues = AuthRequest;