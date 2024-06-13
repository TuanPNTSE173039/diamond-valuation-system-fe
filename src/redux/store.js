import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice.js";
import detailStateReducer from "./detailStateSlice.js";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    detailState: detailStateReducer,
  },
});
