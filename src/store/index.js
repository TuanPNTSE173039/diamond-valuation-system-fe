import { configureStore } from "@reduxjs/toolkit";
import { userProgressSlice } from "./userProgress.js";

const store = configureStore({
  reducer: { userProgress: userProgressSlice.reducer },
});

export const userProgressActions = userProgressSlice.actions;
export default store;
