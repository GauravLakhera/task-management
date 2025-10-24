import { configureStore } from '@reduxjs/toolkit';
import projectSlice from './slices/project';
import dashboardSlice from './slices/dashboards';
import userSlice from './slices/users';

const store = configureStore({
  reducer: {
    projectSlice,
    dashboardSlice,
    userSlice
  }
});

export default store;
