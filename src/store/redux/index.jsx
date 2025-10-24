import { configureStore } from '@reduxjs/toolkit';
import projectSlice from './slices/project';
import dashboardSlice from './slices/dashboards';
import issueSlice from './slices/issue';

const store = configureStore({
  reducer: {
    projectSlice,
    dashboardSlice,
    issueSlice
  }
});

export default store;
