import { createSlice } from '@reduxjs/toolkit';
import { getWorkshopsByOwner } from './workshopAction.js';

const workshopSlice = createSlice({
  name: 'workshop',
  initialState: {
    workshops: [],
    loading: false,
    error: null
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWorkshopsByOwner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWorkshopsByOwner.fulfilled, (state, action) => {
        state.loading = false;
        state.workshops = action.payload;
      })
      .addCase(getWorkshopsByOwner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default workshopSlice.reducer;
