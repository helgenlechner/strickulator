import {
  getHeightOfOneRow,
  getWidthOfOneStitch,
} from '../../../store/project/project.swatch.selectors';
import {
  getHandCircumference,
  getCuffHeight,
  getThumbCircumference,
  getThumbRootLength,
  getHandLength,
  getTipHeight,
  getThumbLength,
} from './mittens.measurements.selectors';
import { createSelector } from 'redux-views';
import { divideRoundToEvenNumberAndHalve } from '../../../helpers/divideRoundToEvenNumberAndHalve';
import { divideAndRoundToEvenNumber } from '../../../helpers/divideAndRoundToEvenNumber';
import { roundToEvenNumber } from '../../../helpers/rounding';

export const getNumberOfHandStitches = createSelector(
  [getHandCircumference, getWidthOfOneStitch],
  divideRoundToEvenNumberAndHalve,
);

export const getNumberOfCuffRows = createSelector(
  [getCuffHeight, getHeightOfOneRow],
  (cuffHeight, heightOfOneRow) => {
    const singleCuffRows = divideAndRoundToEvenNumber(
      cuffHeight,
      heightOfOneRow,
    );

    if (!singleCuffRows) {
      return undefined;
    }

    return singleCuffRows * 2;
  },
);

export const getNumberOfThumbStitches = createSelector(
  [getThumbCircumference, getWidthOfOneStitch],
  divideRoundToEvenNumberAndHalve,
);

export const getNumberOfThumbRootRows = createSelector(
  [getThumbRootLength, getHeightOfOneRow],
  divideAndRoundToEvenNumber,
);

export const getNumberOfHandRowsTotal = createSelector(
  [getHandLength, getHeightOfOneRow],
  divideAndRoundToEvenNumber,
);

export const getNumberOfTipRows = createSelector(
  [getTipHeight, getHeightOfOneRow],
  divideAndRoundToEvenNumber,
);

export const getNumberOfPalmRows = createSelector(
  [getNumberOfThumbRootRows, getNumberOfHandRowsTotal, getNumberOfTipRows],
  (numberOfThumbRootRows, numberOfHandRows, numberOfTipRows) => {
    if (!numberOfThumbRootRows || !numberOfHandRows || !numberOfTipRows) {
      return undefined;
    }

    return numberOfHandRows - numberOfThumbRootRows - numberOfTipRows;
  },
);

export const getNumberOfStitchesAtTip = createSelector(
  [getNumberOfHandStitches],
  (numberOfHandStitches) =>
    numberOfHandStitches && roundToEvenNumber(numberOfHandStitches * 0.6),
);

export const getNumberOfThumbRows = createSelector(
  [getThumbLength, getHeightOfOneRow],
  divideAndRoundToEvenNumber,
);
