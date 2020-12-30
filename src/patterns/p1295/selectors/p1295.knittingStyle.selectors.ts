import { createSelector } from 'redux-views';
import { KnittingStyle, Project } from '../../../store/project/project.model';
import { AppState } from '../../../store/store.model';

const getProject = (state: AppState): Project | undefined =>
  state.projects['0'];

export const getKnittingStyle = createSelector(
  [getProject],
  (project) => project?.knittingStyle ?? KnittingStyle.inTheRound,
);

export const getIsKnittedInTheRound = createSelector(
  [getKnittingStyle],
  (knittingStyle) => knittingStyle === KnittingStyle.inTheRound,
);
