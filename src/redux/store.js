import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import counterReducer from "./counter/counterSlice.js";
import detailStateReducer from "./detailStateSlice.js";
import messageReducer from "./messageSlide.js";

const reducer = {
  counter: counterReducer,
  detailState: detailStateReducer,
  auth: authReducer,
  message: messageReducer,
};

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
});
