import { responseError } from "@/lib/handleError";
import http from "@/lib/http";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const fetchMyOrders = createAsyncThunk(
  "order/orders/me",
  async (_, thunkAPI) => {
    try {
      const res = await http.get("/order/orders/me");
      return res.data.myOrders;
    } catch (error) {
      const message = responseError(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const placeOrder = createAsyncThunk(
  "order/new",
  async (data, thunkAPI) => {
    try {
      const res = await http.post("/order/new", data);
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      const message = responseError(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
