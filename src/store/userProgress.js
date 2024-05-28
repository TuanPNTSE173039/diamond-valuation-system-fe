import { createSlice } from "@reduxjs/toolkit";

const initialUserProgressState = {
  userProgress: "",
};
export const userProgressSlice = createSlice({
  name: "userProgress",
  initialState: initialUserProgressState,
  reducers: {
    showConsultantAssign(state) {
      state.userProgress = "AssignConsultant";
    },
    hideConsultantAssign(state) {
      state.userProgress = "";
    },
    showValuationAssign(state) {
      state.userProgress = "AssignValuation";
    },
    hideValuationAssign(state) {
      state.userProgress = "";
    },
  },
});
