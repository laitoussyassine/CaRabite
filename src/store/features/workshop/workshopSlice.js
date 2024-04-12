import { createSlice } from '@reduxjs/toolkit';
import { fetchWorkshops } from './workshopAction';

const initialState = {
  workshops: [],
  loading: false,
  message: '',
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
      });
  },
});

export default workshopsSlice.reducer;
