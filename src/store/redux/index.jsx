import { configureStore } from '@reduxjs/toolkit';
import projectSlice from './slices/project';

const store = configureStore({
  reducer: {
    projectSlice
  }
});

export default store;
