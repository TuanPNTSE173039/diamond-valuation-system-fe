import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prevState: "",
  current: "",
};
export const detailStateSlice = createSlice({
  name: "detailState",
  initialState,
  reducers: {
    setCurrent: (state, action) => {
      state.prevState = state.current;
      state.current = action.payload.current;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload.amount;
    },
  },
});

export const {} = detailStateSlice.actions;

export default detailStateSlice.reducer;
