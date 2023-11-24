import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import useStoreService from "./storeService";
import { toast } from "react-toastify";


export const createStore = createAsyncThunk(
    "store/create",
    async (storeData, thunkAPI) => {
      try {
        return await useStoreService.createStore(storeData);
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
        return await useStoreService.updateStore(id , values);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const getStore = createAsyncThunk(
    "store/get",
    async (id, thunkAPI) => {
      try {
        return await useStoreService.getStore(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const resetState = createAction("Reset_all");

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
          toast.success(`Đã thiết kế thành công cửa hàng của bạn `);
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
        .addCase(resetState, () => initialState);
    },
  });
  export default storeSlice.reducer;
  