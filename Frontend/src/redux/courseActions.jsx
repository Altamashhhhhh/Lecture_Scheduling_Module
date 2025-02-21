import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = "https://lecture-scheduling-module-1qpg.onrender.com";

export const createCourse = createAsyncThunk(
  "course/create-course",
  async ({ courseData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${URL}/course/create-course`,
        courseData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCourses = createAsyncThunk(
  "course/courses",
  async (token) => {
    try {
      const response = await axios.get(`${URL}/course/courses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return {
        message: error.response.data.message,
        success: error.response.data.success,
      };
    }
  }
);

