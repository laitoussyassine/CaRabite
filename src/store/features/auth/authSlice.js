import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout } from "./authAction.js";

const initialState = {
    user: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
    role: "",
    loading: false,
    isRegisterSuccess: false,
    isLoginSuccess: false,
    message: "",
    logOutMessage: ""
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
            state.message = action.payload.message
        })
        builder.addCase(register.rejected, (state, action) => {
            state.isRegisterSuccess = false,
            state.loading=false,
            state.message = action.payload.message
        })
        builder.addCase(login.pending, (state) => {
            state.loading = true
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false,
            state.isLoginSuccess = true,
            state.user = action.payload.token,
            state.role = action.payload.role,
            state.message = action.payload.message
            localStorage.setItem('token', JSON.stringify(action.payload.token));
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false,
            state.isLoginSuccess = false,
            state.message = action.payload.message
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            state.loggedOut = true,
            localStorage.removeItem('token'),
            state.logOutMessage = action.payload.message,
            state.user = null
            
        })
    }
})


export const { clearMessage } = authSlice.actions;
export default authSlice.reducer;