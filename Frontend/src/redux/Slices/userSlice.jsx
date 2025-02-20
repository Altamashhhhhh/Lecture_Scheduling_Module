import { createSlice } from "@reduxjs/toolkit";

import { loginUser, registerUser } from "../userActions";

const initialState = {
  users: [],
  userInfo: null,
  isLogged: false,
  status: "idle",
  error: null,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "Loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "Completed";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "Loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.status = "Completed";
        state.userInfo = payload.user;
        state.isLogged = true;
        state.token = payload.token;
      })
      .addCase(loginUser.rejected, (state, { payload, error }) => {
        state.status = "Failed";
        state.error = payload || error.message;
      });
  },
});

export default userSlice.reducer;
