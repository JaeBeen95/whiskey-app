import { useForm } from "react-hook-form";
import { useLoginMutation, useSignupMutation } from "@/pages/auth/hooks/useAuthMutation";
import type { LoginFormValues, SignupFormValues } from "@/pages/auth/types";

export const useSignupForm = () => {
  const { mutate: signupMutate, isLoading } = useSignupMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<SignupFormValues>({
    mode: "all",
  });

  const password = watch("password", "");

  const onSubmit = async (data: SignupFormValues) => {
    await signupMutate({ username: data.username, password: data.password });
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isValid,
    isLoading,
    passwordWatch: password,
  };
};

export const useLoginForm = () => {
  const { mutate: loginMutate, isLoading } = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginFormValues) => {
    await loginMutate({ username: data.username, password: data.password });
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isValid,
    isLoading,
  };
};
