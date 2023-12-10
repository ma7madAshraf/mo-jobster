import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { getLocalStorage } from "../../utils/localStorage";
import { createJobThunk, deleteJobThunk, editJobThunk } from "./jobThunk";

const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

//add job

export const createJob = createAsyncThunk("job/createJob", createJobThunk);

//delete job
export const deleteJob = createAsyncThunk("job/deleteJob", deleteJobThunk);

//editJob
export const editJob = createAsyncThunk("job/editJob", editJobThunk);

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    inputChange: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    clearValues: (state) => {
      return {
        ...initialState,
        jobLocation: getLocalStorage()?.location || "",
      };
    },
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("job created");
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      //deleteJob
      .addCase(deleteJob.fulfilled, (state, { payload }) => {
        toast.success(payload);
      })
      .addCase(deleteJob.rejected, (state, { payload }) => {
        toast.error(payload);
      })
      //editJob
      .addCase(editJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("job edited");
      })
      .addCase(editJob.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });
  },
});
export default jobSlice.reducer;
export const { inputChange, clearValues, setEditJob } = jobSlice.actions;
