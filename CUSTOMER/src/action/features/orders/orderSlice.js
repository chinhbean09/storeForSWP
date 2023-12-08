import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import orderService from "./orderService";

export const createOrder = createAsyncThunk(
    "orders/create",
    async (newOrder,thunkAPI) => {
      try {
        return await orderService.createOrder(newOrder);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }

    
  );

  const initialState = {
    orders: [],
  
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  };
 
  export const resetState = createAction("Reset_all");


export const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createOrder.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(createOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.newOrders = action.payload;
          })
          .addCase(createOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
          })
        .addCase(resetState, () => initialState);

    } 
});
export default orderSlice.reducer;