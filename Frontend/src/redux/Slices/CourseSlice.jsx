import { createSlice } from "@reduxjs/toolkit";
import { createCourse, fetchCourses } from "../courseActions";

const initialState = {
  courses: [],
  error: null,
  status: "idle",
  success : null 
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createCourse.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(createCourse.fulfilled, (state, { payload }) => {
        (state.status = "Completed"), state.courses.push(payload);
      })
      .addCase(createCourse.rejected, (state, { payload, error }) => {
        state.status = "Failed";
        state.error = payload || error.message;
      })
      .addCase(fetchCourses.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchCourses.fulfilled, (state, { payload }) => {
        (state.status = "Completed"), state.courses = payload.courses;
      })
      .addCase(fetchCourses.rejected, (state, { payload, error }) => {
        state.status = "Failed";
        console.log(payload)
        state.error = payload 
      });
  },
});

export default courseSlice.reducer;
