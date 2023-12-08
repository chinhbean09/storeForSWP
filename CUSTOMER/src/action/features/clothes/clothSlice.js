import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import clothService from "./clothService";

export const getClothes = createAsyncThunk(
    "cloth/all",
    async (thunkAPI) => {
      try {
        return await clothService.getClothes()
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  export const resetState = createAction("Reset_all");
const initialState = {
  clothes: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const clothSlice = createSlice({
    name: "clothes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getClothes.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getClothes.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.clothes = action.payload;
          })
          .addCase(getClothes.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
          })
        .addCase(resetState, () => initialState);

    } 
});
export default clothSlice.reducer;