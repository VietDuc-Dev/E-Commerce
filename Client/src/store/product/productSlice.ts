import { createSlice } from "@reduxjs/toolkit";
import {
  deleteReview,
  fetchAllProducts,
  fetchProductDetails,
  fetchProductWithAI,
  // postReview,
} from "./productThunks";
import type { ProductState } from "./productTypes";

const initialState: ProductState = {
  loading: false,
  products: [],
  productDetails: null,
  paginnation: null,
  topRatedProducts: [],
  newProducts: [],
  aiSearching: false,
  isReviewDeleting: false,
  isPostingReview: false,
  productReviews: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.paginnation = action.payload.pagination ?? 0;
        state.newProducts = action.payload.newProducts ?? [];
        state.topRatedProducts = action.payload.topRatedProducts ?? [];
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.loading = false;
      })

      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
        // state.productDetails = action.payload.reviews ?? [];
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.loading = false;
      })

      // .addCase(postReview.pending, (state) => {
      //   state.isPostingReview = true;
      // })
      // .addCase(postReview.fulfilled, (state, action) => {
      //   state.isPostingReview = false;
      //   state.productReviews = [action.payload, ...state.productReviews];
      // })
      // .addCase(postReview.rejected, (state) => {
      //   state.isPostingReview = false;
      // })

      .addCase(deleteReview.pending, (state) => {
        state.isReviewDeleting = true;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.isReviewDeleting = false;
        state.productReviews = state.productReviews.filter(
          (review) => review.review_id !== action.payload
        );
      })
      .addCase(deleteReview.rejected, (state) => {
        state.isReviewDeleting = false;
      })

      .addCase(fetchProductWithAI.pending, (state) => {
        state.aiSearching = true;
      })
      .addCase(fetchProductWithAI.fulfilled, (state, action) => {
        state.aiSearching = false;
        state.products = action.payload.products;
        // state.paginnation = action.payload.pagination.total ?? 0;
      })
      .addCase(fetchProductWithAI.rejected, (state) => {
        state.aiSearching = false;
      });
  },
});

export default productSlice.reducer;
