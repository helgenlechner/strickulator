import { AppState } from '../store.model';
import { createIdSelector, createSelector } from 'redux-views';
import { ProjectId, Project } from './project.model';

export const getProjects = (state: AppState) => state.projects;

export const getProjectId = createIdSelector(
  (props: { projectId: ProjectId }) => props.projectId,
);

export const getProject = createSelector(
  [getProjects, getProjectId],
  (projects, projectId): Project | undefined => projects[projectId],
);

export const getProjectLabel = createSelector(
  [getProject],
  (project) => project?.label,
);
