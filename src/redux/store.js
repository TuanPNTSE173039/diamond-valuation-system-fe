import { configureStore } from "@reduxjs/toolkit";
import assessingReducer from "./assessingSlice.js";
import authReducer from "./authSlice.js";
import counterReducer from "./counter/counterSlice.js";
import detailStateReducer from "./detailStateSlice.js";
import filterReducer from "./filterSlice.js";
import messageReducer from "./messageSlide.js";
import valuateReducer from "./valuateSlice.js";

const reducer = {
  counter: counterReducer,
  detailState: detailStateReducer,
  auth: authReducer,
  message: messageReducer,
  assessing: assessingReducer,
  valuate: valuateReducer,
  filter: filterReducer,
};

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
});
