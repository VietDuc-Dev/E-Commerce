import { createAsyncThunk } from "@reduxjs/toolkit";
import { toggleAuthPopup } from "../popup/popupSlice";
import { toast } from "react-toastify";
import http from "@/lib/http";
import type {
  Login,
  Register,
  ResetPassword,
  UpdatePassword,
  UpdateProfile,
} from "./authTypes";

export const register = createAsyncThunk(
  "auth/register",
  async (data: Register, thunkAPI) => {
    const res = await http.post("/auth/register", data);
    toast.success(res.data.message);
    thunkAPI.dispatch(toggleAuthPopup());
    return res.data.user;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data: Login, thunkAPI) => {
    const res = await http.post("/auth/login", data);
    toast.success(res.data.message);
    thunkAPI.dispatch(toggleAuthPopup());
    return res.data.user;
  }
);

export const getUser = createAsyncThunk("auth/getUser", async () => {
  const res = await http.get("/auth/me");
  return res.data.user;
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  await http.get("/auth/logout");
  thunkAPI.dispatch(toggleAuthPopup());
  return null;
});

export const forgotPassword = createAsyncThunk(
  "auth/password/forgot",
  async (email: string) => {
    const res = await http.post(
      `/auth/password/forgot?frontendUrl=${import.meta.env.FRONT_END_URL}`,
      email
    );
    toast.success(res.data.message);
    return null;
  }
);

export const resetPassword = createAsyncThunk(
  "auth/password/reset",
  async ({ token, data }: { token: string; data: ResetPassword }) => {
    const res = await http.put(`/auth/password/reset/${token}`, data);
    toast.success(res.data.message);
    return res.data.user;
  }
);

export const updatePassword = createAsyncThunk(
  "auth/password/update",
  async (data: UpdatePassword) => {
    const res = await http.put(`/auth/password/update`, data);
    toast.success(res.data.message);
    return null;
  }
);

export const updateProfile = createAsyncThunk(
  "auth/profile/update",
  async (data: UpdateProfile) => {
    const res = await http.put(`/auth/profile/update`, data);
    toast.success(res.data.message);
    return res.data.user;
  }
);
