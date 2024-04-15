import { createSlice } from '@reduxjs/toolkit';
import { fetchWorkshops, deleteWorkshop, OwnerWorkshopDetails, updateWorkshop } from './workshopAction.js';

const initialState = {
  workshops: [],
  loading: false,
  message: '',
  deleting: false,
  error: null,
  workshop: null,
  selectedWorkshop: null, // New property to hold a selected workshop
};

const workshopsSlice = createSlice({
  name: 'workshops',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkshops.pending, (state) => {
        state.loading = true;
        state.message = '';
      })
      .addCase(fetchWorkshops.fulfilled, (state, action) => {
        state.loading = false;
        state.workshops = action.payload;
        state.message = '';
      })
      .addCase(fetchWorkshops.rejected, (state, action) => {
        state.loading = false;
        state.workshops = [];
        state.message = action.payload || 'Failed to fetch workshops';
      })
      .addCase(deleteWorkshop.pending, (state) => {
        state.loading = true;
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteWorkshop.fulfilled, (state) => {
        state.loading = false;
        state.deleting = false;
        state.error = null;
      })
      .addCase(deleteWorkshop.rejected, (state, action) => {
        state.loading = false;
        state.deleting = false;
        state.error = action.payload.error || 'An error occurred while deleting the workshop.';
      })
      .addCase(OwnerWorkshopDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(OwnerWorkshopDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.workshop = action.payload;
        state.error = null;
      })
      .addCase(OwnerWorkshopDetails.rejected, (state, action) => {
        state.loading = false;
        state.workshop = null;
        state.error = action.payload;
      })
      .addCase(updateWorkshop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWorkshop.fulfilled, (state, action) => {
        state.loading = false;
        state.workshop = action.payload;
        state.selectedWorkshop = action.payload; // Update selectedWorkshop after successful update
      })
      .addCase(updateWorkshop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default workshopsSlice.reducer;
