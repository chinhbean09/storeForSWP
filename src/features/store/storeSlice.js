import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import storeService from "./storeService";


export const createStore = createAsyncThunk(
    "store/create",
    async (storeData, thunkAPI) => {
      try {
        return await storeService.addNewStore(storeData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const updateStore = createAsyncThunk(
    "store/update",
    async (data,thunkAPI) => {
     
      try {
        const {id, values} = data;
        console.log(data)
        return await storeService.updateStore(`${id}`, values);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const getStore = createAsyncThunk(
    "store/get",
    async (id, thunkAPI) => {
      try {
        return await storeService.getStore(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  const initialState = {
    store:[],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  };

  export const storeSlice = createSlice({
    name: "store",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        
        .addCase(getStore.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getStore.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.store = action.payload || null;
        })
        .addCase(getStore.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
  
        .addCase(createStore.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createStore.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.addStore = action.payload;
        })
        .addCase(createStore.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
  
        .addCase(updateStore.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateStore.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.updatedStore = action.payload;
        })
        .addCase(updateStore.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
    },
  });
  export default storeSlice.reducer;
  