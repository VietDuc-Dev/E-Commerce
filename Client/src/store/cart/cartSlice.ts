import { createSlice } from "@reduxjs/toolkit";
import type { CartState } from "./cartTypes";
import { toast } from "react-toastify";

const storedCart = localStorage.getItem("cart");
const initialState: CartState = {
  cart: storedCart ? JSON.parse(storedCart) : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { product, quantity } = action.payload;

      const existingItem = state.cart.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cart.push({
          product,
          quantity,
        });
      }
    },

    removeFromCart(state, action) {
      state.cart = state.cart.filter(
        (item) => item.product.id !== action.payload.id
      );
    },

    addItem(state, action) {
      const { product, quantity } = action.payload;

      if (product.stock > quantity) {
        const existingItem = state.cart.find(
          (item) => item.product.id === product.id
        );

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.cart.push({ product, quantity: 1 });
        }
      } else {
        toast.error(`Sản phẩm chỉ còn ${product.stock}`);
      }
    },

    removeItem(state, action) {
      const { product } = action.payload;

      const existingItem = state.cart.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.cart = state.cart.filter(
            (item) => item.product.id !== product.id
          );
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, addItem, removeItem } =
  cartSlice.actions;

export default cartSlice.reducer;
