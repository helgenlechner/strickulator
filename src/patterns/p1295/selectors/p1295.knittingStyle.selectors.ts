import { createSelector } from 'redux-views';
import { KnittingStyle } from '../../../store/project/project.model';
import { getProject } from '../../../store/project/project.selectors';

export const getKnittingStyle = createSelector(
  [getProject],
  (project) => project?.knittingStyle ?? KnittingStyle.inTheRound,
);

export const getIsKnittedInTheRound = createSelector(
  [getKnittingStyle],
  (knittingStyle) => knittingStyle === KnittingStyle.inTheRound,
);
