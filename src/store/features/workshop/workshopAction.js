import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../config.js';

export const fetchWorkshops = createAsyncThunk(
  'workshops/fetchWorkshops',
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/findWorkshops`, {
        params: { query },
      });

      if (response.data.success) {
        return response.data.data; // Return the workshops data on success
      } else {
        // If response is not successful, handle the error message
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      // Handle network error or other types of errors
      if (error.response) {
        // Server responded with a non-2xx status
        return rejectWithValue(error.response.data);
      } else {
        // Request failed
        return rejectWithValue('Failed to fetch workshops');
      }
    }
  }
);
