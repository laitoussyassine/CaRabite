import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from '../../../config.js';


export const getWorkshopsByOwner = createAsyncThunk(
    "workshop/getWorkshopsByOwner",
    async (data, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${BASE_URL}/workshops`, {
          headers: {
            Authorization: `Bearer ${data.token}`
          }
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );