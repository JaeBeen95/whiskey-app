import { useLoginMutation, useSignupMutation } from "@/pages/auth/hooks/useAuthMutation";
import { validateLoginForm, validateSignupForm } from "@/pages/auth/utils/validation";

export const useSignupForm = () => {
  const { mutate, ...signupMutationRest } = useSignupMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const usernameInput = form.elements.namedItem("username") as HTMLInputElement;
    const passwordInput = form.elements.namedItem("password") as HTMLInputElement;
    const confirmPasswordInput = form.elements.namedItem("confirm-password") as HTMLInputElement;

    const username = (usernameInput?.value || "").trim();
    const password = (passwordInput?.value || "").trim();
    const confirmPassword = (confirmPasswordInput?.value || "").trim();

    const validationError = validateSignupForm({ username, password, confirmPassword });

    if (validationError) {
      alert(validationError);
      return;
    }

    if (signupMutationRest.isLoading) {
      return;
    }

    await mutate({ username, password });
  };

  return {
    handleSubmit,
    ...signupMutationRest,
  };
};

export const useLoginForm = () => {
  const { mutate, ...loginMutationRest } = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const usernameInput = form.elements.namedItem("username") as HTMLInputElement;
    const passwordInput = form.elements.namedItem("password") as HTMLInputElement;

    const username = (usernameInput?.value || "").trim();
    const password = (passwordInput?.value || "").trim();

    const validationError = validateLoginForm({ username, password });

    if (validationError) {
      alert(validationError);
      return;
    }

    if (loginMutationRest.isLoading) {
      return;
    }

    await mutate({ username, password });
  };

  return {
    handleSubmit,
    ...loginMutationRest,
  };
};
