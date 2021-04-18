import { createSelector } from 'redux-views';
import { getStep } from '../custom.input.selectors';
import { Shape } from '../custom.model';

export const getBottomWidth = createSelector([getStep], (step) => {
  if (step?.shape === Shape.Trapezoid) {
    return step?.bottomWidth;
  }

  return undefined;
});

export const getTopWidth = createSelector([getStep], (step) => {
  if (step?.shape === Shape.Trapezoid) {
    return step?.topWidth;
  }

  return undefined;
});

export const getHeight = createSelector([getStep], (step) => {
  if (step?.shape === Shape.Trapezoid) {
    return step?.height;
  }

  return undefined;
});
