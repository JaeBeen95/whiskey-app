interface AuthFormData {
  username?: string;
  password?: string;
  confirmPassword?: string;
}

export const validateSignupForm = (data: AuthFormData): string | null => {
  const { username, password, confirmPassword } = data;

  if (!username || username.trim() === '') {
    return "아이디를 입력해주세요.";
  }
  if (!password || password.trim() === '') {
    return "비밀번호를 입력해주세요.";
  }
  if (!confirmPassword || confirmPassword.trim() === '') {
    return "비밀번호 확인을 입력해주세요.";
  }

  const usernameRegex = /^[a-z0-9]{4,20}$/;
  if (!usernameRegex.test(username)) {
    return "아이디는 4~20자의 영어 소문자와 숫자만 가능합니다.";
  }

  const passwordLengthRegex = /^.{8,20}$/;
  const passwordContentRegex = /^[a-z0-9]+$/;

  if (!passwordLengthRegex.test(password)) {
    return "비밀번호는 8자 이상 20자 이하여야 합니다.";
  }
  if (/\s/.test(password)) {
      return "비밀번호에 공백을 포함할 수 없습니다.";
  }
  if (!passwordContentRegex.test(password)) {
    return "비밀번호는 영어 소문자와 숫자만 가능합니다.";
  }

  if (password !== confirmPassword) {
    return "비밀번호와 비밀번호 확인이 일치하지 않습니다.";
  }

  return null;
};

export const validateLoginForm = (data: AuthFormData): string | null => {
  const { username, password } = data;

  if (!username || username.trim() === '') {
    return "아이디를 입력해주세요.";
  }

  if (!password || password.trim() === '') {
    return "비밀번호를 입력해주세요.";
  }

  return null;
};