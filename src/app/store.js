import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/cutomers/customerSlice";
import productReducer from "../features/product/productSlice";
import uploadReducer from "../features/upload/uploadSlice";

export const store = configureStore({
  reducer: {
    
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    upload: uploadReducer,
    
  },
});
