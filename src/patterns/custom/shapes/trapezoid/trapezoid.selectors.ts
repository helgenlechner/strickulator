import { createSelector } from 'redux-views';
import { divideAndRoundToEvenNumber } from '../../../../helpers/divideAndRoundToEvenNumber';
import { divideRoundToEvenNumberAndHalve } from '../../../../helpers/divideRoundToEvenNumberAndHalve';
import { calculateSlope } from '../../../../helpers/slope';
import {
  getHeightOfOneRow,
  getWidthOfOneStitch,
} from '../../../../store/project/project.swatch.selectors';
import { getStep } from '../../store/custom.input.selectors';
import { isTrapezoid } from './trapezoid.model';

export const getTrapezoid = createSelector([getStep], (step) =>
  isTrapezoid(step) ? step : undefined,
);

export const getBottomWidth = createSelector(
  [getTrapezoid],
  (step) => step?.bottomWidth,
);

export const getTopWidth = createSelector(
  [getTrapezoid],
  (step) => step?.topWidth,
);

export const getHeight = createSelector([getTrapezoid], (step) => step?.height);

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
