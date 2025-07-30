import { z } from "zod";

export const signupSchema = z
  .object({
    username: z
      .string()
      .min(1, "아이디는 필수입니다.")
      .min(4, "아이디는 최소 4자 이상이어야 합니다.")
      .regex(/^[a-z0-9]+$/, "아이디는 영어 소문자와 숫자만 사용 가능합니다."),
    password: z
      .string()
      .min(1, "비밀번호는 필수입니다.")
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
      .regex(/^[a-z0-9]+$/, "비밀번호는 영어 소문자와 숫자만 사용 가능합니다."),
    confirmPassword: z.string().min(1, "비밀번호 확인은 필수입니다."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  username: z.string().min(1, "아이디를 입력해주세요."),
  password: z.string().min(1, "비밀번호를 입력해주세요."),
});
