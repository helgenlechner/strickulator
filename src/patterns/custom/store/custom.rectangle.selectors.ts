import { createSelector } from 'redux-views';
import { divideAndRoundToEvenNumber } from '../../../helpers/divideAndRoundToEvenNumber';
import { divideRoundToEvenNumberAndHalve } from '../../../helpers/divideRoundToEvenNumberAndHalve';
import {
  getHeightOfOneRow,
  getWidthOfOneStitch,
} from '../../../store/project/project.swatch.selectors';
import { getStep } from './custom.input.selectors';
import { Shape } from '../custom.model';

export const getWidth = createSelector([getStep], (step) => {
  if (step?.shape === Shape.Rectangle) {
    return step?.width;
  }

  return undefined;
});

export const getHeight = createSelector([getStep], (step) => {
  if (step?.shape === Shape.Rectangle) {
    return step?.height;
  }

  return undefined;
});

export const getNumberOfStitches = createSelector(
  [getWidth, getWidthOfOneStitch],
  divideRoundToEvenNumberAndHalve,
);

export const getNumberOfRows = createSelector(
  [getHeight, getHeightOfOneRow],
  divideAndRoundToEvenNumber,
);
