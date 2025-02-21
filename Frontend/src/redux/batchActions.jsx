import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "https://lecture-scheduling-module-1qpg.onrender.com";

export const assignBatch = createAsyncThunk(
  "batch/assign",
  async ({ instructorId, courseId, date, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${URL}/batch/assign`,
        { instructorId, courseId, date },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchBatches = createAsyncThunk(
  "batch/fetch",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}/batch`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.batches;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const fetchInstructorBatches = createAsyncThunk(
    "batch/instructorBatches",
    async (token, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${URL}/batch/instructor-batches`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.batches;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  );