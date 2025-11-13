import { createSlice } from "@reduxjs/toolkit";
import type { OrderState } from "./orderTypes";
import { fetchMyOrders, placeOrder } from "./orderThunks";

const initialState: OrderState = {
  myOrders: [],
  fetchingOrders: false,
  placingOrder: false,
  finalPrice: null,
  orderStep: 1,
  paymentIntent: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    toggleOrderStep(state) {
      state.orderStep = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyOrders.pending, (state) => {
        state.fetchingOrders = true;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.fetchingOrders = false;
        state.myOrders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state) => {
        state.fetchingOrders = false;
      })

      .addCase(placeOrder.pending, (state) => {
        state.placingOrder = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.placingOrder = false;
        state.finalPrice = action.payload.total_price;
        state.paymentIntent = action.payload.paymentIntent;
        state.orderStep = 2;
      })
      .addCase(placeOrder.rejected, (state) => {
        state.placingOrder = false;
      });
  },
});

export default orderSlice.reducer;
export const { toggleOrderStep } = orderSlice.actions;
