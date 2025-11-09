import { responseError } from "@/lib/handleError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import type { FetchAllProducts } from "./productTypes";
import http from "@/lib/http";
import { toggleAIModal } from "../popup/popupSlice";

export const fetchAllProducts = createAsyncThunk(
  "product/fetchAll",
  async (
    {
      availability = "",
      price = "0-10000",
      category = "",
      ratings = "",
      search = "",
      page = 1,
    }: FetchAllProducts,
    thunkAPI
  ) => {
    try {
      const params = new URLSearchParams();
      // if (category) params.append("category", category);
      // if (price) params.append("price", price);
      // if (search) params.append("search", search);
      // if (ratings) params.append("ratings", ratings);
      // if (availability) params.append("availability", availability);
      // if (page) params.append("page", String(page));

      const query = { availability, price, category, ratings, search, page };

      Object.entries(query).forEach(([key, value]) => {
        if (value) params.append(key, String(value));
      });

      const res = await http.get(`/product?${params.toString()}`);

      return res.data;
    } catch (error) {
      const message = responseError(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  "product/singleProduct",
  async (id: string, thunkAPI) => {
    try {
      const res = await http.get(`/product/singleProduct/${id}`);
      return res.data.product;
    } catch (error) {
      const message = responseError(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postReview = createAsyncThunk(
  "product/post-new/review",
  async (
    { productId, review }: { productId: string; review: string },
    thunkAPI
  ) => {
    try {
      const res = await http.put(
        `/product/post-new/review/${productId}`,
        review
      );
      toast.success(res.data.message);
      return res.data.review;
    } catch (error) {
      const message = responseError(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteReview = createAsyncThunk(
  "product/post-new/review",
  async (
    { productId, reviewId }: { productId: string; reviewId: string },
    thunkAPI
  ) => {
    try {
      const res = await http.delete(`/product/delete/review/${productId}`);
      toast.success(res.data.message);
      return reviewId;
    } catch (error) {
      const message = responseError(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchProductWithAI = createAsyncThunk(
  "product/ai-search",
  async (userPrompt: string, thunkAPI) => {
    try {
      const res = await http.post(`/product/ai-search`, userPrompt);
      thunkAPI.dispatch(toggleAIModal());
      return res.data;
    } catch (error) {
      const message = responseError(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
