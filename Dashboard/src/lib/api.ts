import {
  CurrentUserResponseType,
  LoginResponseType,
  loginType,
  RegisterType,
} from "../types/api.type";
import http from "./http";

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

export const getCurrentUserQueryFn =
  async (): Promise<CurrentUserResponseType> => {
    const response = await http.get(`/auth/me`);
    return response.data;
  };
