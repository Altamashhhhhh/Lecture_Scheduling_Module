import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "https://lecture-scheduling-module-1qpg.onrender.com";

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/user/register`, userData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/user/login`, userData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const fetchInstructors = createAsyncThunk(
  "user/instructors",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}/user/instructors`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.instructors);
      return response.data.instructors;
    } catch (error) {
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateInstructor = createAsyncThunk(
  "user/update-user",
  async ({ id, updatedData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${URL}/user/update-user/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.respo.data.message);
    }
  }
);
