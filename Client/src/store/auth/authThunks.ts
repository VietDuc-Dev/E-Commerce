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
import { responseError } from "@/lib/handleError";

export const register = createAsyncThunk(
  "auth/register",
  async (data: Register, thunkAPI) => {
    try {
      const res = await http.post("/auth/register", data);
      toast.success(res.data.message);
      thunkAPI.dispatch(toggleAuthPopup());
      return res.data.user;
    } catch (error) {
      const message = responseError(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data: Login, thunkAPI) => {
    try {
      const res = await http.post("/auth/login", data);
      toast.success(res.data.message);
      thunkAPI.dispatch(toggleAuthPopup());
      return res.data.user;
    } catch (error) {
      const message = responseError(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
  try {
    const res = await http.get("/auth/me");
    return res.data.user;
  } catch (error) {
    const message = responseError(error);
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await http.get("/auth/logout");
    thunkAPI.dispatch(toggleAuthPopup());
    return null;
  } catch (error) {
    const message = responseError(error);
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const forgotPassword = createAsyncThunk(
  "auth/password/forgot",
  async (email: string, thunkAPI) => {
    try {
      const res = await http.post(
        `/auth/password/forgot?frontendUrl=${
          import.meta.env.VITE_FRONT_END_URL
        }`,
        { email: email }
      );
      toast.success(res.data.message);
      return null;
    } catch (error) {
      const message = responseError(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/password/reset",
  async (
    { token, data }: { token?: string; data: ResetPassword },
    thunkAPI
  ) => {
    try {
      const res = await http.put(`/auth/password/reset/${token}`, data);
      toast.success(res.data.message);
      return res.data.user;
    } catch (error) {
      const message = responseError(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "auth/password/update",
  async (data: UpdatePassword, thunkAPI) => {
    try {
      const res = await http.put(`/auth/password/update`, data);
      toast.success(res.data.message);
      return null;
    } catch (error) {
      const message = responseError(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/profile/update",
  async (data: UpdateProfile, thunkAPI) => {
    try {
      const res = await http.put(`/auth/profile/update`, data);
      toast.success(res.data.message);
      return res.data.user;
    } catch (error) {
      const message = responseError(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
