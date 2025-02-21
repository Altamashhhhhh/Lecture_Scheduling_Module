import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import courseReducer from "./Slices/CourseSlice";
import batchReducer  from "./Slices/batchSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    course: courseReducer,
    batch : batchReducer
  },
});
