import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../services/auth.service.js";
import { setMessage } from "./messageSlide.js";

const user = JSON.parse(localStorage.getItem("auth"))?.user;

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(username, password);
      return { user: data.userInformation };
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);
//isAuthenticated: false
//isInitialized: false
//user
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      });
  },
});

const { reducer } = authSlice;
export default reducer;
