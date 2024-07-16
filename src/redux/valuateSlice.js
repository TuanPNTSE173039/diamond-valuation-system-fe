import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  previous: "",
  current: "",
};

export const valuateSlice = createSlice({
  name: "valuate",
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

const { reducer, actions } = valuateSlice;
export const { setPrevious, setCurrent } = actions;
export default reducer;
