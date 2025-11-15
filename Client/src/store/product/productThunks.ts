import { responseError } from "@/lib/handleError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import http from "@/lib/http";

interface FetchAllProductsProps {
  search?: string;
  price?: string | null;
  ratings?: number | null;
  category?: string;
  availability?: string;
  page?: number | null;
}

export const fetchAllProducts = createAsyncThunk(
  "product/fetchAll",
  async (
    {
      availability,
      price,
      category,
      ratings,
      search,
      page,
    }: FetchAllProductsProps,
    thunkAPI
  ) => {
    try {
      const params = new URLSearchParams();
      if (category) params.append("category", category);
      if (price) params.append("price", price);
      if (search) params.append("search", search);
      if (ratings) params.append("ratings", String(ratings));
      if (availability) params.append("availability", availability);
      if (page) params.append("page", String(page));

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
      return res.data;
    } catch (error) {
      const message = responseError(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
