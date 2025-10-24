import { createSelector } from 'reselect';

const getLoading = (state) => state.projectSlice.loading;
const getProjectList = (state) => state.projectSlice.projectList;

export const ProjectSelector = () =>
  createSelector([getLoading, getProjectList], (loading, projectList) => ({
    loading,
    projectList
  }));
