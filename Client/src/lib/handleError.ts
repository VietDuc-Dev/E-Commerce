import type { AxiosError } from "axios";

export function responseError(error: unknown) {
  const axiosError = error as AxiosError<{ message?: string }>;
  return axiosError.response?.data?.message || axiosError.message;
}
