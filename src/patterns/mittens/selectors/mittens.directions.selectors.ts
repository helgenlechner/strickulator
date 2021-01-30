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
  getThumbLength,
  getTipWidth,
  getPinkieSideTipHeight,
  getIndexFingerSideTipHeight,
} from './mittens.measurements.selectors';
import { createSelector } from 'redux-views';
import { divideRoundToEvenNumberAndHalve } from '../../../helpers/divideRoundToEvenNumberAndHalve';
import { divideAndRoundToEvenNumber } from '../../../helpers/divideAndRoundToEvenNumber';
import { calculateSlope } from '../../../helpers/slope';

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

export const getThumbRootSlope = createSelector(
  [getNumberOfHandStitches, getNumberOfThumbStitches, getNumberOfThumbRootRows],
  (handStitches, thumbStitches, thumbRootRows) => {
    if (!handStitches || !thumbStitches) {
      return undefined;
    }

    return calculateSlope(
      handStitches,
      handStitches + thumbStitches,
      thumbRootRows,
    );
  },
);

export const getNumberOfHandRowsTotal = createSelector(
  [getHandLength, getHeightOfOneRow],
  divideAndRoundToEvenNumber,
);

export const getNumberOfIndexFingerSideTipRows = createSelector(
  [getIndexFingerSideTipHeight, getHeightOfOneRow],
  divideAndRoundToEvenNumber,
);

export const getNumberOfPinkieSideTipRows = createSelector(
  [getPinkieSideTipHeight, getHeightOfOneRow],
  divideAndRoundToEvenNumber,
);

export const getNumberOfTipRows = createSelector(
  [getNumberOfIndexFingerSideTipRows, getNumberOfPinkieSideTipRows],
  (indexFingerSideTipRows, pinkieSideTipRows) => {
    if (!indexFingerSideTipRows || !pinkieSideTipRows) {
      return undefined;
    }
    return Math.max(indexFingerSideTipRows, pinkieSideTipRows);
  },
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
  [getTipWidth, getWidthOfOneStitch],
  divideAndRoundToEvenNumber,
);

export const getNumberOfThumbRows = createSelector(
  [getThumbLength, getHeightOfOneRow],
  divideAndRoundToEvenNumber,
);

export const getNumberOfStitchesToDecreaseAtIndexSide = createSelector(
  [getNumberOfHandStitches],
  (numberOfHandStitches) => {
    if (!numberOfHandStitches) {
      return undefined;
    }

    return Math.round(numberOfHandStitches * 0.34);
  },
);

export const getIndexFingerSlope = createSelector(
  [getNumberOfStitchesToDecreaseAtIndexSide, getNumberOfIndexFingerSideTipRows],
  (numberOfStitchesToDecreaseAtIndexSide, numberOfRows) => {
    return calculateSlope(
      numberOfStitchesToDecreaseAtIndexSide,
      0,
      numberOfRows,
    );
  },
);

export const getNumberOfStitchesToDecreaseAtPinkieSide = createSelector(
  [
    getNumberOfHandStitches,
    getNumberOfStitchesAtTip,
    getNumberOfStitchesToDecreaseAtIndexSide,
  ],
  (
    numberOfHandStitches,
    numberOfTipStitches,
    numberOfStitchesToDecreaseAtIndexSide,
  ) => {
    if (
      !numberOfHandStitches ||
      !numberOfTipStitches ||
      !numberOfStitchesToDecreaseAtIndexSide
    ) {
      return undefined;
    }

    return (
      numberOfHandStitches -
      numberOfTipStitches -
      numberOfStitchesToDecreaseAtIndexSide
    );
  },
);

export const getPinkieFingerSlope = createSelector(
  [getNumberOfStitchesToDecreaseAtPinkieSide, getNumberOfPinkieSideTipRows],
  (numberOfStitchesToDecreaseAtPinkieSide, numberOfRows) => {
    return calculateSlope(
      numberOfStitchesToDecreaseAtPinkieSide,
      0,
      numberOfRows,
    );
  },
);
