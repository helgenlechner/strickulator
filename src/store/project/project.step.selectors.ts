import { createSelector } from 'redux-views';
import { getStep } from './project.input.selectors';
import { KnittingStyle } from './project.model';

export const getKnittingStyle = createSelector(
  [getStep],
  (step) => step?.knittingStyle ?? KnittingStyle.flat,
);

export const getIsKnittedInTheRound = createSelector(
  [getKnittingStyle],
  (knittingStyle) => knittingStyle === KnittingStyle.inTheRound,
);
