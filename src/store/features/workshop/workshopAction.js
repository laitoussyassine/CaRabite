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


export const fetchWorkshopById = createAsyncThunk(
  'workshops/fetchWorkshopById',
  async (workshopId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/findWorkshops/${workshopId}`);

      if (response.data.success) {
        return response.data.data; // Return the workshop data on success
      } else {
        return rejectWithValue(response.data.error); // Return error message on failure
      }
    } catch (error) {
      return rejectWithValue(error.message); // Return network error message
    }
  }
);

export const deleteWorkshop = createAsyncThunk(
  'workshops/deleteWorkshop',
  async (workshopId, { rejectWithValue }) => {
    try {
      // Make the DELETE request to your API
      const response = await axios.delete(`${BASE_URL}/workshops/${workshopId}`);
      return response.data; // Return the deleted workshop data
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors
    }
  }
);