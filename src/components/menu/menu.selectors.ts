import { getProjects } from '../../store/project/project.selectors';
import { createSelector } from 'redux-views';
import { patterns } from '../../patterns/patterns';
import { ProjectId } from '../../store/project/project.model';
import { PatternId } from '../../store/pattern/pattern.model';

export interface MenuItem {
  id: ProjectId | PatternId;
  label: string;
  isActive: boolean;
  children: MenuItem[];
  updatedAt?: number;
}

export const getMenuStructure = createSelector([getProjects], (projects) => {
  const menuStructure: MenuItem[] = patterns.map((pattern) => ({
    id: pattern.id,
    label: pattern.label,
    isActive: false,
    children: [],
  }));

  Object.values(projects)
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .forEach((project) => {
      const matchingPattern = menuStructure.find(
        (menuItem) => menuItem.id === project.patternId,
      );
      if (matchingPattern) {
        matchingPattern.children.push({
          id: project.id,
          label: project.label,
          isActive: false,
          updatedAt: project.updatedAt,
          children: [],
        });
      }
    });

  return menuStructure.sort((a, b) => {
    if (!a.children[0]?.updatedAt) {
      return -1;
    }

    if (!b.children[0]?.updatedAt) {
      return 1;
    }

    return a.children[0].updatedAt - b.children[0]?.updatedAt;
  });
});
