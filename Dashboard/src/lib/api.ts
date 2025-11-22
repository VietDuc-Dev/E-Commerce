import {
  CurrentUserResponseType,
  LoginResponseType,
  loginType,
  RegisterType,
  ForgotPasswordType,
  ResetPasswordType,
} from "../types/api.type";
import http from "./http";

// ======================== AUTH ========================
export const loginMutationFn = async (
  data: loginType
): Promise<LoginResponseType> => {
  const response = await http.post("/auth/login", data);

  return response.data;
};

export const registerMutationFn = async (
  data: RegisterType
): Promise<{ message: string }> => {
  const response = await http.post("/auth/register", data);

  return response.data;
};

export const forgotPasswordMutationFn = async (
  data: ForgotPasswordType
): Promise<{ message: string }> => {
  const response = await http.post("/auth/password/forgot", data);

  return response.data;
};

export const resetPasswordMutationFn = async (
  data: ResetPasswordType
): Promise<{ message: string }> => {
  const response = await http.put(`/auth/password/reset/${data.token}`, data);

  return response.data;
};

export const getCurrentUserQueryFn =
  async (): Promise<CurrentUserResponseType> => {
    const response = await http.get(`/auth/me`);
    return response.data;
  };

// ========================  ========================
// ========================  ========================
// ========================  ========================
