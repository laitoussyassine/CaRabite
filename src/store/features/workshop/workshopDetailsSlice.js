// workshopDetailsSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { fetchWorkshopById } from './workshopAction.js';

const workshopDetailsSlice = createSlice({
  name: 'workshopDetails',
  initialState: {
    workshop: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle loading and error states based on fetchWorkshopDetails action
    builder
      .addCase(fetchWorkshopById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkshopById.fulfilled, (state, action) => {
        state.loading = false;
        state.workshop = action.payload;
        state.error = null;
      })
      .addCase(fetchWorkshopById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default workshopDetailsSlice.reducer;
