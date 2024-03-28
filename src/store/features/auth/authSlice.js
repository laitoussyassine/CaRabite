import { createSlice } from "@reduxjs/toolkit";
import { register } from "./authAction.js";

const initialState = {
    user: null,
    loading: false,
    isRegisterSuccess: false,
    isLoginSuccess: false,
    message: "",
    loggedOut: false
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        clearMessage : (state) => {
            state.message = ""
        }
    },
    extraReducers : (builder) => {
        builder.addCase(register.pending, (state) => {
            state.loading = true
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.loading=false,
            state.isRegisterSuccess = true,
            state.message = action.payload
        })
        builder.addCase(register.rejected, (state, action) => {
            state.isRegisterSuccess = false,
            state.loading=false,
            state.message = action.payload
        })
    }
})


export const { clearMessage } = authSlice.actions;
export default authSlice.reducer;