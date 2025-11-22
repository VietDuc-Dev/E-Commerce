export type loginType = { email: string; password: string };
export type LoginResponseType = {
  message: string;
  accessToken: string;
  user: UserType;
};

export type RegisterType = {
  name: string;
  email: string;
  password: string;
};

export type ForgotPasswordType = {
  email: string;
};

export type ResetPasswordType = {
  password: string;
  confirmPassword: string;
  token?: string;
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: { url: string };
  created_at: string;
};

export type CurrentUserResponseType = {
  message: string;
  user: UserType;
};
