import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from '../../../config.js'


export const register = createAsyncThunk("auth/register", async (data, {rejectWithValue}) => {
    const {username, email,password,role} = data;
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`,{
            username,
            email,
            password,
            role
        });
        return  response.data
    } catch (error) {
        const message = error.response.data
        console.log(message);
        return rejectWithValue(message);
    }
});
export const login = createAsyncThunk("auth/login", async (data, {rejectWithValue}) => {
    const {email,password} = data;
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`,{
            email,
            password,
            
        });
        return response.data
    } catch (error) {
        console.log(error);
        const message = error.response.data
        console.log(message);
        return rejectWithValue(message);
    }
});


export const logout = createAsyncThunk('auth/logout', async (data, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/logout`);
        return response.data
        
    }
    catch (error) {
        const message = error.response.data
        console.log("1",message);
        return rejectWithValue(message);
    }
})

