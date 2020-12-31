import { createSelector } from 'redux-views';
import { findPattern } from '../../patterns/patterns';
import { getProject } from '../project/project.selectors';

export const getPatternIdForProject = createSelector(
  [getProject],
  (project) => project?.patternId,
);

export const getPatternDefinitionForProject = createSelector(
  [getPatternIdForProject],
  findPattern,
);

export const getPatternTitle = createSelector(
  [getPatternDefinitionForProject],
  (patternDefinition) => patternDefinition?.label,
);

export const getPatternUrl = createSelector(
  [getPatternDefinitionForProject],
  (patternDefinition) => patternDefinition?.url,
);

export const getPatternDescription = createSelector(
  [getPatternDefinitionForProject],
  (patternDefinition) => patternDefinition?.description,
);

export const getPatternInputForm = createSelector(
  [getPatternDefinitionForProject],
  (patternDefinition) => patternDefinition?.inputForm,
);

export const getPatternDirections = createSelector(
  [getPatternDefinitionForProject],
  (patternDefinition) => patternDefinition?.directions,
);
