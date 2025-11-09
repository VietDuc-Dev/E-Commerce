import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import popupReducer from "./popup/popupSlice";
import productReducer from "./product/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    popup: popupReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
