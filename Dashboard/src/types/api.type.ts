import { AvailabilityType } from "@/enum/product";

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

export type UpdateProfileType =
  | FormData
  | {
      name: string;
      email: string;
      avatar?: File;
    };

export type UpdatePasswordType = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
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

export type AllUserResponseType = {
  message: string;
  totalUser: number;
  currentPage: number;
  users: UserType[];
};

export type ProductImageType = {
  url: string;
  public_id: string;
};

export type Review = {
  review_id: string;
  rating: string;
  comment: string;
  reviewer: {
    id: string;
    name: string;
    avatar?: { url: string };
  };
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  ratings: number;
  images: ProductImageType[];
  stock: number;
  created_by: string;
  created_at: string;
  review_count: number;
  reviews?: Review[];
};

export type AllProductPayloadType = {
  availability?: AvailabilityType;
  price?: string;
  category?: string;
  ratings?: number;
  search?: string;
  page: number;
  skip?: boolean;
};

type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
};

export type AllProductResponseType = {
  message: string;
  products: Product[];
  pagination: Pagination;
  filters: AllProductPayloadType;
  newProducts?: Product[];
  topRated?: Product[];
};
