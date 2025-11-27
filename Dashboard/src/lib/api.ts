import {
  CurrentUserResponseType,
  LoginResponseType,
  loginType,
  RegisterType,
  ForgotPasswordType,
  ResetPasswordType,
  UpdateProfileType,
  UpdatePasswordType,
  AllUserResponseType,
  AllProductPayloadType,
  AllProductResponseType,
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

export const forgotPasswordMutationFn = async (data: ForgotPasswordType) => {
  const response = await http.post("/auth/password/forgot", data);

  return response.data;
};

export const resetPasswordMutationFn = async (data: ResetPasswordType) => {
  const response = await http.put(`/auth/password/reset/${data.token}`, data);

  return response.data;
};

export const getCurrentUserQueryFn =
  async (): Promise<CurrentUserResponseType> => {
    const response = await http.get(`/auth/me`);
    return response.data;
  };

export const updateProfileMutationFn = async (data: UpdateProfileType) => {
  const response = await http.put(`/auth/profile/update`, data);
  return response.data;
};

export const updatePasswordMutationFn = async (data: UpdatePasswordType) => {
  const response = await http.put(`/auth/password/update`, data);
  return response.data;
};

export const logoutMutationFn = async () => {
  await http.get("/auth/logout");
};
// ======================== USERS ========================
export const getAllUserQueryFn = async (): Promise<AllUserResponseType> => {
  const response = await http.get("/admin/getallusers");
  return response.data;
};

export const deleteUserMutationFn = async (
  id: string
): Promise<{ message: string }> => {
  const response = await http.delete(`/admin/delete/${id}`);
  return response.data;
};
// ======================== PRODUCT ========================
export const getProductsQueryFn = async ({
  availability,
  price,
  category,
  ratings,
  search,
  page = 1,
}: AllProductPayloadType): Promise<AllProductResponseType> => {
  const params = new URLSearchParams();
  if (category) params.append("category", category);
  if (price) params.append("price", price);
  if (search) params.append("search", search);
  if (ratings) params.append("ratings", String(ratings));
  if (availability) params.append("availability", availability);
  if (page) params.append("page", String(page));

  const response = await http.get(`/product?${params.toString()}`);
  return response.data;
};

// ========================  ========================
