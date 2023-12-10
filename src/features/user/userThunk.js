import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { clearAllJobsState, clearSearchValues } from "../allJobs/allJobsSlice";
import { logout } from "./userSlice";

export const loginUserThunk = async (user, thunkAPI) => {
  try {
    const resp = await customFetch.post("/auth/login", user);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const registerUserThunk = async (user, thunkAPI) => {
  try {
    const resp = await customFetch.post("/auth/register", user);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const updateUserThunk = async (user, thunkAPI) => {
  try {
    const resp = await customFetch.patch("/auth/updateUser", user);
    return resp.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logout());
      return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
    }
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const clearStoreThunk = async (message, thunkAPI) => {
  try {
    thunkAPI.dispatch(logout(message));
    thunkAPI.dispatch(clearSearchValues());
    thunkAPI.dispatch(clearAllJobsState());
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
