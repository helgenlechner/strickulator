import { createSelector } from 'redux-views';
import { divideAndRoundToEvenNumber } from '../../../helpers/divideAndRoundToEvenNumber';
import { divideRoundToEvenNumberAndHalve } from '../../../helpers/divideRoundToEvenNumberAndHalve';
import {
  getHeightOfOneRow,
  getWidthOfOneStitch,
} from '../../../store/project/project.swatch.selectors';
import { getStep } from '../../store/custom.input.selectors';
import { isRectangle } from './rectangle.model';

export const getRectangle = createSelector([getStep], (step) =>
  isRectangle(step) ? step : undefined,
);

export const getWidth = createSelector([getRectangle], (step) => step?.width);

export const getHeight = createSelector([getRectangle], (step) => step?.height);

export const getNumberOfStitches = createSelector(
  [getWidth, getWidthOfOneStitch],
  divideRoundToEvenNumberAndHalve,
);

export const getNumberOfRows = createSelector(
  [getHeight, getHeightOfOneRow],
  divideAndRoundToEvenNumber,
);
