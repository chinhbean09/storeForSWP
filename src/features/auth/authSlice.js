import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authServices";

let  access_token = localStorage.getItem('access_token')
  ? JSON.parse(localStorage.getItem('access_token'))
  : null

  
let  userInfoDTO = localStorage.getItem('userInfoDTO')
? JSON.parse(localStorage.getItem('userInfoDTO'))
: null

const initialState = {
  userInfoDTO,
  access_token,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const login = createAsyncThunk(
  "auth/authenticate",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const signup = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);




export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userInfoDTO') 
      localStorage.setItem('access_token',JSON.stringify(state.access_token)) 
      state.userInfoDTO= null;
      state.access_token = null;
      state.isError = false;
      state.isLoading = false;
      state.isSuccess=false;
      
   

    },
  },
  extraReducers: (buildeer) => {
    buildeer
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        
        state.userInfoDTO = action.payload.userInfoDTO;
        state.access_token = action.payload.access_token;
        state.message = "success";
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
     
      
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.createdUser = action.payload;
        state.message = "success";
      })
      .addCase(signup.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })



  },
});
export const { logout } = authSlice.actions
export default authSlice.reducer;

