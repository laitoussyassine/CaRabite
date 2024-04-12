import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import workshopReducer from "./features/workshop/workshopSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        workshops: workshopReducer
    },
    devTools: true
})


export default store;