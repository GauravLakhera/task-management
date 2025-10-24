import { createSelector } from 'reselect';

const getLoading = (state) => state.projectSlice.loading;
const getProjectList = (state) => state.projectSlice.projectDetails;

export const ProjectSelector = () =>
  createSelector([getLoading, getProjectList], (loading, projectDetails) => ({
    loading,
    projectDetails
  }));
