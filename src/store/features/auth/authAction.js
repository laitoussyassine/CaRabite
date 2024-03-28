import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from '../../../config.js'


export const register = createAsyncThunk("auth/register", async (data, {rejectWithValue}) => {
    const {username, email,password ,role} = data;
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`,{
            username,
            email,
            password,
            role
        });
        return  response.data
    } catch (error) {
        const message = error.response.data.message
        console.log(message);
        return rejectWithValue(message);
    }
})

