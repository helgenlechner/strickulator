import { getProjects } from '../../store/project/project.selectors';
import { createSelector } from 'redux-views';
import { ProjectId } from '../../store/project/project.model';
import { PatternId } from '../../store/pattern/pattern.model';

export interface MenuItem {
  id: ProjectId | PatternId;
  label: string;
  isActive: boolean;
  updatedAt?: number;
}

export const getMenuStructure = createSelector(
  [getProjects],
  (projects): MenuItem[] =>
    Object.values(projects)
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .map((project) => ({
        id: project.id,
        label: project.label,
        isActive: false,
        updatedAt: project.updatedAt,
      })),
);
