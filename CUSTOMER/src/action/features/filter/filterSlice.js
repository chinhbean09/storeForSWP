import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import filterService from "./filterService";

export const getFilter = createAsyncThunk(
    "filters/get-store",
    async (filter,thunkAPI) => {
      try {
        return await filterService.getFilter(filter);
        
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  export const resetState = createAction("Reset_all");
const initialState = {
  filters: [],

  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getFilter.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getFilter.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.filters = action.payload;
          })
          .addCase(getFilter.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
          })
        .addCase(resetState, () => initialState);

    } 
});
export default filterSlice.reducer;