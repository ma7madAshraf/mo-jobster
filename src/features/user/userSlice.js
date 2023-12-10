import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "../../utils/localStorage";
import {
  clearStoreThunk,
  loginUserThunk,
  registerUserThunk,
  updateUserThunk,
} from "./userThunk";
const initialState = {
  isLoading: false,
  sidebar: true,
  user: getLocalStorage(),
};

export const loginUser = createAsyncThunk("user/loginUser", loginUserThunk);
export const registerUser = createAsyncThunk(
  "user/registerUser",
  registerUserThunk
);
export const updateUser = createAsyncThunk("user/updateUser", updateUserThunk);

export const clearStore = createAsyncThunk("user/clearStore", clearStoreThunk);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebar = !state.sidebar;
    },
    logout: (state, action) => {
      state.user = null;
      state.sidebar = false;
      removeLocalStorage();
      if (action.payload) {
        toast.success(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.isLoading = false;
        state.user = user;
        setLocalStorage(user);
        toast.success(`hello there ${user.name}`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        setLocalStorage(user);
        toast.success(`welcome back ${user.name}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        setLocalStorage(user);
        toast.success(`user updated`);
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      }).addCase(clearStore.rejected,()=>{
        toast.error('there was an error...')
      })
  },
});

export default userSlice.reducer;
export const { toggleSidebar, logout } = userSlice.actions;
