import { CurrentUserResponseType } from "../types/api.type";
import http from "./http";

export const getCurrentUserQueryFn =
  async (): Promise<CurrentUserResponseType> => {
    const response = await http.get(`/auth/me`);
    return response.data;
  };
