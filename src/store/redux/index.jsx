import { configureStore } from '@reduxjs/toolkit';
import projectSlice from './slices/project';
import dashboardSlice from './slices/dashboards';

const store = configureStore({
  reducer: {
    projectSlice,
    dashboardSlice
  }
});

export default store;
