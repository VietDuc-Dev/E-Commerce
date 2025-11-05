import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import popupReducer from "./popup/popupSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    popup: popupReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
