import { createSlice } from '@reduxjs/toolkit';
import { fetchWorkshops, deleteWorkshop } from './workshopAction.js';

const initialState = {
  workshops: [],
  loading: false,
  message: '',
  deleting: false,
  error: null,
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
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteWorkshop.fulfilled, (state) => {
        state.deleting = false;
        state.error = null;
      })
      .addCase(deleteWorkshop.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload.error || 'An error occurred while deleting the workshop.';
      });
  },
});

export default workshopsSlice.reducer;
