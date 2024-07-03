import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const messageSlide = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
});

const { reducer, actions } = messageSlide;
export const { setMessage, clearMessage } = actions;
export default reducer;
