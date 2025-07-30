import { z } from "zod";
import type { loginSchema, signupSchema } from "@/pages/auth/utils/auth.schema";

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

export type SignupFormData = z.infer<typeof signupSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
