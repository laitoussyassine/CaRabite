import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import workshopReducer from "./features/workshop/workshopSlice";
import workshopDetailsReducer from "./features/workshop/workshopDetailsSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        workshops: workshopReducer,
        workshopDetails:workshopDetailsReducer,

    },
    devTools: true
})


export default store;