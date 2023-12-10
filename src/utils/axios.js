import axios from "axios";
import { getLocalStorage } from "./localStorage";
import { clearStore } from "../features/user/userSlice";

const customFetch = axios.create({
  baseURL: "https://jobify-prod.herokuapp.com/api/v1/toolkit",
});
customFetch.interceptors.request.use((config) => {
  const user = getLocalStorage();
  if (user) {
    config.headers["Authorization"] = `Bearer ${user.token}`;
  }
  return config;
});
export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore("Unauthorized! Logging Out..."));
    return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};

export default customFetch;
