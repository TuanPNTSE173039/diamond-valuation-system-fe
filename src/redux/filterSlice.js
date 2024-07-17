import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const initialState = {
  searchValue: "",
  startDate: dayjs(new Date().toDateString()).subtract(7, "day"),
  endDate: dayjs(new Date().toDateString()),
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    clearSearchValue: (state) => {
      state.searchValue = "";
    },
    clearDates: (state) => {
      state.startDate = dayjs(new Date().toDateString()).subtract(7, "day");
      state.endDate = dayjs(new Date().toDateString());
    },
  },
});

const { reducer, actions } = filterSlice;
export const {
  setEndDate,
  setSearchValue,
  setStartDate,
  clearDates,
  clearSearchValue,
} = actions;
export default reducer;
