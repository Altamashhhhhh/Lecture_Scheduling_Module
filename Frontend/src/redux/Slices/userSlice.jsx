import { createSlice } from "@reduxjs/toolkit";
import { fetchInstructors, loginUser, registerUser, updateInstructor } from "../userActions";

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
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.isLogged = false;
      state.token = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "Loading";
        state.error = null;
        state.isLogged = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "Completed";
        state.isLogged = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload || action.error.message;
        state.isLogged = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "Loading";
        state.error = null;
        state.isLogged = false;
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
        state.isLogged = false;
      })
      .addCase(fetchInstructors.pending, (state) => {
        state.status = "Loading";
        state.error = null;
      })
      .addCase(fetchInstructors.fulfilled, (state, { payload }) => {
        state.status = "Completed";
        state.error = null;
        state.users = payload;
      })
      .addCase(fetchInstructors.rejected, (state, { payload, error }) => {
        state.status = "Failed";
        state.error = payload || error.message;
      }).addCase(updateInstructor.pending, (state) => {
        state.status = "Loading";
        state.error = null;
      })
      .addCase(updateInstructor.fulfilled, (state, { payload }) => {
        state.status = "Completed";
        state.error = null; 
      })
      .addCase(updateInstructor.rejected, (state, { payload, error }) => {
        state.status = "Failed";
        state.error = payload || error.message;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
