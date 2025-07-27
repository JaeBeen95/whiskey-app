import { useForm } from "react-hook-form";
import { useLoginMutation, useSignupMutation } from "@/pages/auth/hooks/useAuthMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, signupSchema } from "@/pages/auth/utils/auth.schema";
import type {
  LoginFormData,
  LoginFormValues,
  SignupFormData,
  SignupFormValues,
} from "@/pages/auth/types";

export const useSignupForm = () => {
  const { mutate: signupMutate, isLoading } = useSignupMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "all",
  });

  const onSubmit = (data: SignupFormData) => {
    const { confirmPassword, ...submissionData } = data;
    signupMutate(submissionData);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isValid,
    isLoading,
  };
};

export const useLoginForm = () => {
  const { mutate: loginMutate, isLoading } = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutate(data);
  };
  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isValid,
    isLoading,
  };
};
