import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import materialService from "./materialService";

export const getMaterials = createAsyncThunk(
    "material/all",
    async (thunkAPI) => {
      try {
        return await materialService.getMaterials();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
export const resetState = createAction("Reset_all");
const initialState = {
  materials: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const materialSlice = createSlice({
    name: "materials",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getMaterials.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getMaterials.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.materials = action.payload;
          })
          .addCase(getMaterials.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
          })
        .addCase(resetState, () => initialState);

    } 
});
export default materialSlice.reducer;