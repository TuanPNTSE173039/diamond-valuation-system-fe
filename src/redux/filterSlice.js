import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  keyword: "",
  searchValue: "",
  startDate: null,
  endDate: null,
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
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    clearSearchValue: (state) => {
      state.searchValue = "";
    },
    clearDates: (state) => {
      state.startDate = null;
      state.endDate = null;
    },
  },
});

const { reducer, actions } = filterSlice;
export const {
  setEndDate,
  setSearchValue,
  setStartDate,
  setKeyword,
  clearDates,
  clearSearchValue,
} = actions;
export default reducer;
