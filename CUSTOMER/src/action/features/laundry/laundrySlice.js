import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import laundryService from "./laundryService";


export const getAllSpecialServicebyStore = createAsyncThunk(
  "laundry/get-all-specieal-services-by-store",
  async (id, thunkAPI) => {
    try {
      return await laundryService.getAllSpecialServicebyStore(id);

    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getStandardServicebyStore = createAsyncThunk(
  "laundry/get-standard-service-by-store",
  async (id, thunkAPI) => {
    try {
      return await laundryService.getStandardServicebyStore(id);

    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const getService = createAsyncThunk(
  "laundry/get-service",
  async (id, thunkAPI) => {
    try {
      return await laundryService.getService(id);

    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");
const initialState = {
  laundries: [],
  specialLaundries: [],
  standardLaundries: [],
  singleService:"",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};


export const laundrySlice = createSlice({
  name: "laudries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSpecialServicebyStore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSpecialServicebyStore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.specialLaundries = action.payload;
      })
      .addCase(getAllSpecialServicebyStore.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getStandardServicebyStore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStandardServicebyStore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.standardLaundries = action.payload;
      })
      .addCase(getStandardServicebyStore.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleService = action.payload;
      })
      .addCase(getService.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(resetState, () => initialState);
  }
});

export default laundrySlice.reducer;

