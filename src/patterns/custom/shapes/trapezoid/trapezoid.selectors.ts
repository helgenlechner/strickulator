import { createSelector } from 'redux-views';
import { divideAndRoundToEvenNumber } from '../../../../helpers/divideAndRoundToEvenNumber';
import { divideRoundToEvenNumberAndHalve } from '../../../../helpers/divideRoundToEvenNumberAndHalve';
import { calculateSlope } from '../../../../helpers/slope';
import {
  getHeightOfOneRow,
  getWidthOfOneStitch,
} from '../../../../store/project/project.swatch.selectors';
import { getStep } from '../../store/custom.input.selectors';
import { Shape } from '../../custom.model';

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

export const getNumberOfBottomStitches = createSelector(
  [getBottomWidth, getWidthOfOneStitch],
  divideRoundToEvenNumberAndHalve,
);

export const getNumberOfTopStitches = createSelector(
  [getTopWidth, getWidthOfOneStitch],
  divideRoundToEvenNumberAndHalve,
);

export const getNumberOfRows = createSelector(
  [getHeight, getHeightOfOneRow],
  divideAndRoundToEvenNumber,
);

export const getSlope = createSelector(
  [getNumberOfBottomStitches, getNumberOfTopStitches, getNumberOfRows],
  calculateSlope,
);
