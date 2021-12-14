import { createSelector } from 'redux-views';
import { getStep } from '../../../store/project/project.input.selectors';
import { isBezier } from './bezier.model';

export const getBezier = createSelector([getStep], (step) =>
  isBezier(step) ? step : undefined,
);

export const getPoints = createSelector(
  [getBezier],
  (bezier) => bezier?.points,
);
