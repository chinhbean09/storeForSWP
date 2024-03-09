import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
export const admin = configureStore({
    reducer: {
        auth:authReducer,
    },
});