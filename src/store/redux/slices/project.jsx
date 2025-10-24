import api from '@/services/api';
import apiKeys from '@/services/apiKeys';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getProjectList = createAsyncThunk(
  'data/bookingDetails',
  async function getDetails(payload, thunkapi) {
    try {
      const response = await api.get(`${apiKeys.projectList}`);
      return response.data;
    } catch (error) {}
  }
);

const initialState = {
  loading: false,
  error: null,
  projectList: []
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjectList.pending, (state) => {
        state.loading = true;
        state.projectList = [];
      })
      .addCase(getProjectList.fulfilled, (state, action) => {
        state.loading = false;
        state.projectList = action?.payload?.data || {};
      })
      .addCase(getProjectList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
        state.projectList = [];
      });
  }
});

export default projectSlice.reducer;
