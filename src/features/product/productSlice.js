import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productService";

export const getProducts = createAsyncThunk(
  "store/special-service/all",
  async (id,thunkAPI) => {
    try {
      return await productService.getProducts(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createProducts = createAsyncThunk(
  "product/create-products",
  async (productData, thunkAPI) => {
    try {
      return await productService.createProduct(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const addNewStandardService = createAsyncThunk(
  "product/standard/create",
  async (productData, thunkAPI) => {
    try {
      return await productService.addNewStandardService(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getStandardService = createAsyncThunk(
  "product/standard/get",
  async (id, thunkAPI) => {
    try {
      return await productService.getStandardService(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateStandardService = createAsyncThunk(
  "product/standard/update",
  async (data,thunkAPI) => {
   
    try {
      const {id, values} = data;
      console.log(data)
      return await productService.updateStandardService(`${id}`, values);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");

const initialState = {
  products: [],
  standardService:"",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdProduct = action.payload;
      })
      .addCase(createProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(getStandardService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStandardService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.standardService = action.payload;
      })
      .addCase(getStandardService.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(addNewStandardService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewStandardService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdProduct = action.payload;
      })
      .addCase(addNewStandardService.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(updateStandardService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStandardService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedProduct = action.payload;
      })
      .addCase(updateStandardService.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default productSlice.reducer;
