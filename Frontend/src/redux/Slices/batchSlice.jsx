import { createSlice } from "@reduxjs/toolkit";
import { assignBatch, fetchBatches, fetchInstructorBatches } from "../batchActions";
const initialState = {
  batches: [],
  status: "idle",
  error: null,
};

export const batchSlice = createSlice({
  name: "batch",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(assignBatch.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(assignBatch.fulfilled, (state, { payload }) => {
        state.status = "Completed";
        state.batches.push(payload.batch);
      })
      .addCase(assignBatch.rejected, (state, { payload }) => {
        state.status = "Failed";
        state.error = payload;
      })
      .addCase(fetchBatches.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchBatches.fulfilled, (state, { payload }) => {
        state.status = "Completed";
        state.batches = payload;
      })
      .addCase(fetchBatches.rejected, (state, { payload }) => {
        state.status = "Failed";
        state.error = payload;
      }).addCase(fetchInstructorBatches.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchInstructorBatches.fulfilled, (state, { payload }) => {
        state.status = "Completed";
        state.instructorBatches = payload;
      })
      .addCase(fetchInstructorBatches.rejected, (state, { payload }) => {
        state.status = "Failed";
        state.error = payload;
      });
  },
});

export default batchSlice.reducer;
