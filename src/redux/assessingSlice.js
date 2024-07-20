import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  previous: "",
  current: "",
};

export const assessingSlice = createSlice({
  name: "assessing",
  initialState,
  reducers: {
    setCurrent: (state, action) => {
      state.current = action.payload;
    },
    setPrevious: (state, action) => {
      state.previous = action.payload;
    },
  },
});

const { reducer, actions } = assessingSlice;
export const { setPrevious, setCurrent } = actions;
export default reducer;
