import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import storeService from "./storeService";
export const getStore = createAsyncThunk(
    "store/get-store",
    async (id, thunkAPI) => {
        try {
            return await storeService.getStore(id);

        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getAllStore = createAsyncThunk(
    "store/get-all-stores",
    async (thunkAPI) => {
        try {
            return await storeService.getAllStore();

        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const resetState = createAction("Reset_all");
const initialState = {
    stores: [],
    singleStore:"",
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const storeSlice = createSlice({
    name: "stores",
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
                state.singleStore = action.payload; 
            })
            .addCase(getStore.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getAllStore.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllStore.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.stores = action.payload;
            })
            .addCase(getAllStore.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })

            .addCase(resetState, () => initialState);
    }
});
export default storeSlice.reducer;

