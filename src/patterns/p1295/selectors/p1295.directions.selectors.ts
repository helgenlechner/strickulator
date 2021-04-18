import { createSelector } from 'redux-views';
import { divideAndRoundToEvenNumber } from '../../../helpers/divideAndRoundToEvenNumber';
import { divideRoundToEvenNumberAndHalve } from '../../../helpers/divideRoundToEvenNumberAndHalve';
import { calculateHypotenuse } from '../../../helpers/hypotenuse';
import { roundToEvenNumber } from '../../../helpers/rounding';
import { calculateSlope } from '../../../helpers/slope';
import {
  getBackHeightAtShoulders,
  getBackWidthBetweenArmholes,
  getBodiceHeightUntilArmhole,
  getBottomArmholeHeight,
  getFrontHeightAtShoulders,
  getFrontWidthBetweenArmholes,
  getHeightBetweenArmholes,
  getHemHeight,
  getHemWidth,
  getNecklineDepth,
  getNeckWidth,
  getSleeveHemHeight,
  getUnderarmToSleeveHead,
  getUnderarmWidth,
  getWidthBelowArmhole,
  getWidthOfDecForArmhole,
  getWristToUnderarm,
  getWristWidth,
} from './p1295.measurements.selectors';
import {
  getHeightOfOneRow,
  getWidthOfOneStitch,
} from '../../../store/project/project.swatch.selectors';

export const getNumberOfHemStitches = createSelector(
  [getHemWidth, getWidthOfOneStitch],
  divideRoundToEvenNumberAndHalve,
);

export const getNumberOfHemRows = createSelector(
  [getHemHeight, getHeightOfOneRow],
  divideAndRoundToEvenNumber,
);

export const getNumberOfBodiceRows = createSelector(
  [getBodiceHeightUntilArmhole, getHeightOfOneRow],
  divideAndRoundToEvenNumber,
);

export const getNumberOfStitchesBelowArmhole = createSelector(
  [getWidthBelowArmhole, getWidthOfOneStitch],
  divideRoundToEvenNumberAndHalve,
);

export const getSlopeForBodiceIncreases = createSelector(
  [
    getNumberOfHemStitches,
    getNumberOfStitchesBelowArmhole,
    getNumberOfBodiceRows,
  ],
  calculateSlope,
);

export const getNumberOfArmholeStitchesToCastOff = createSelector(
  [getWidthOfOneStitch, getWidthOfDecForArmhole],
  (widthOfOneStitch, widthOfDecForArmhole) => {
    if (!widthOfDecForArmhole || !widthOfOneStitch) {
      return undefined;
    }

    return Math.round(widthOfDecForArmhole / widthOfOneStitch);
  },
);

export const getNumberOfStitchesAtBottomOfArmhole = createSelector(
  [getNumberOfArmholeStitchesToCastOff, getNumberOfStitchesBelowArmhole],
  (numberOfArmholeStitchesToCastOff, numberOfStitchesBeforeArmhole) => {
    if (!numberOfArmholeStitchesToCastOff || !numberOfStitchesBeforeArmhole) {
      return undefined;
    }

    return numberOfStitchesBeforeArmhole - numberOfArmholeStitchesToCastOff;
  },
);

export const getNumberOfRowsOfBottomArmhole = createSelector(
  [getBottomArmholeHeight, getHeightOfOneRow],
  divideAndRoundToEvenNumber,
);

export const getNumberOfStraightRowsBetweenArmholes = createSelector(
  [getHeightBetweenArmholes, getHeightOfOneRow],
  divideAndRoundToEvenNumber,
);

export const getBackNumberOfStitchesBetweenArmholes = createSelector(
  [getBackWidthBetweenArmholes, getWidthOfOneStitch],
  divideRoundToEvenNumberAndHalve,
);

export const getSlopeForBackBottomArmholeDecreases = createSelector(
  [
    getNumberOfStitchesAtBottomOfArmhole,
    getBackNumberOfStitchesBetweenArmholes,
    getNumberOfRowsOfBottomArmhole,
  ],
  calculateSlope,
);

export const getNumberOfStitchesAtNeck = createSelector(
  [getNeckWidth, getWidthOfOneStitch],
  divideRoundToEvenNumberAndHalve,
);

export const getBackNumberOfRowsBelowNeck = createSelector(
  [getBackHeightAtShoulders, getHeightOfOneRow],
  divideAndRoundToEvenNumber,
);

export const getSlopeForBackShoulderDecreases = createSelector(
  [
    getBackNumberOfStitchesBetweenArmholes,
    getNumberOfStitchesAtNeck,
    getBackNumberOfRowsBelowNeck,
  ],
  calculateSlope,
);

export const getBackArmscyeStitchSum = createSelector(
  [
    getNumberOfStitchesAtBottomOfArmhole,
    getBackNumberOfStitchesBetweenArmholes,
    getNumberOfRowsOfBottomArmhole,
    getNumberOfStraightRowsBetweenArmholes,
  ],
  (
    numberOfRowsOfBottomArmhole,
    numberOfStitchesAtBottomOfArmhole,
    numberOfStitchesBetweenArmholes,
    numberOfStraightRowsBetweenArmholes,
  ) => {
    if (
      !numberOfRowsOfBottomArmhole ||
      !numberOfStitchesAtBottomOfArmhole ||
      !numberOfStitchesBetweenArmholes ||
      !numberOfStraightRowsBetweenArmholes
    ) {
      return undefined;
    }

    return Math.round(
      calculateHypotenuse(
        numberOfRowsOfBottomArmhole,
        numberOfStitchesAtBottomOfArmhole - numberOfStitchesBetweenArmholes,
      ) + numberOfStraightRowsBetweenArmholes,
    );
  },
);

export const getFrontNumberOfStitchesBetweenArmholes = createSelector(
  [getFrontWidthBetweenArmholes, getWidthOfOneStitch],
  divideRoundToEvenNumberAndHalve,
);

export const getNumberOfLowerBottomArmholeRows = createSelector(
  [getNumberOfRowsOfBottomArmhole],
  (numberOfRowsOfBottomArmhole) => {
    if (!numberOfRowsOfBottomArmhole) {
      return undefined;
    }

    return roundToEvenNumber(numberOfRowsOfBottomArmhole * 0.4);
  },
);

export const getNumberOfStitchesAfterLowerBottomArmholeDecreases = createSelector(
  [
    getNumberOfRowsOfBottomArmhole,
    getFrontNumberOfStitchesBetweenArmholes,
    getNumberOfStitchesAtBottomOfArmhole,
  ],
  (
    numberOfRowsOfBottomArmhole,
    numberOfStitchesBetweenArmholes,
    numberOfStitchesAtBottomOfArmhole,
  ) => {
    if (!numberOfRowsOfBottomArmhole) {
      return undefined;
    }

    if (
      !numberOfStitchesBetweenArmholes ||
      !numberOfStitchesAtBottomOfArmhole
    ) {
      return undefined;
    }

    const stitchesToDecrease = Math.round(
      (numberOfStitchesAtBottomOfArmhole - numberOfStitchesBetweenArmholes) *
        0.6,
    );

    return numberOfStitchesAtBottomOfArmhole - stitchesToDecrease;
  },
);

export const getSlopeForLowerBottomArmholeDecreases = createSelector(
  [
    getNumberOfStitchesAtBottomOfArmhole,
    getNumberOfStitchesAfterLowerBottomArmholeDecreases,
    getNumberOfLowerBottomArmholeRows,
  ],
  calculateSlope,
);

export const getNumberOfUpperBottomArmholeRows = createSelector(
  [getNumberOfRowsOfBottomArmhole, getNumberOfLowerBottomArmholeRows],
  (numberOfRowsOfBottomArmhole, numberOfRowsOfLowerBottomArmhole) => {
    if (!numberOfRowsOfBottomArmhole || !numberOfRowsOfLowerBottomArmhole) {
      return undefined;
    }

    return numberOfRowsOfBottomArmhole - numberOfRowsOfLowerBottomArmhole;
  },
);

export const getSlopeForUpperBottomArmholeDecreases = createSelector(
  [
    getNumberOfStitchesAfterLowerBottomArmholeDecreases,
    getFrontNumberOfStitchesBetweenArmholes,
    getNumberOfUpperBottomArmholeRows,
  ],
  calculateSlope,
);

export const getFrontNumberOfRowsAtShoulder = createSelector(
  [getFrontHeightAtShoulders, getHeightOfOneRow],
  divideAndRoundToEvenNumber,
);

export const getNumberOfStitchesForFrontShoulderCastOff = createSelector(
  [getSlopeForBackShoulderDecreases],
  (backShoulderSlope) => {
    if (!backShoulderSlope) {
      return undefined;
    }

    return backShoulderSlope.delta;
  },
);

export const getFrontArmscyeSlope = createSelector(
  [
    getFrontNumberOfStitchesBetweenArmholes,
    getNumberOfStitchesAtNeck,
    getNumberOfStitchesForFrontShoulderCastOff,
    getFrontNumberOfRowsAtShoulder,
  ],
  (
    numberOfStitchesBetweenArmholes,
    numberOfStitchesAtNeck,
    numberOfStitchesForFrontShoulderCastOff,
    numberOfRowsAtShoulder,
  ) => {
    if (
      !numberOfStitchesBetweenArmholes ||
      !numberOfRowsAtShoulder ||
      !numberOfStitchesForFrontShoulderCastOff ||
      !numberOfStitchesAtNeck
    ) {
      return undefined;
    }

    return calculateSlope(
      numberOfStitchesBetweenArmholes,
      numberOfStitchesAtNeck + numberOfStitchesForFrontShoulderCastOff,
      numberOfRowsAtShoulder,
    );
  },
);

export const getNumberOfFrontNecklineRows = createSelector(
  [getNecklineDepth, getHeightOfOneRow],
  divideAndRoundToEvenNumber,
);

export const getFrontNecklineSlope = createSelector(
  [getNumberOfStitchesAtNeck, getNumberOfFrontNecklineRows],
  (numberOfStitchesAtNeck, numberOfNecklineRows) =>
    calculateSlope(numberOfStitchesAtNeck, 0, numberOfNecklineRows),
);

export const getDoesNecklineStartInSectionF = createSelector(
  [getNumberOfFrontNecklineRows, getFrontNumberOfRowsAtShoulder],
  (numberOfNecklineRows, numberOfRowsAtShoulder) =>
    (numberOfNecklineRows ?? 0) <= (numberOfRowsAtShoulder ?? 0),
);

export const getDoesNecklineStartInSectionE = createSelector(
  [
    getNumberOfFrontNecklineRows,
    getFrontNumberOfRowsAtShoulder,
    getNumberOfStraightRowsBetweenArmholes,
  ],
  (
    numberOfNecklineRows,
    numberOfRowsAtShoulder,
    numberOfStraightRowsBetweenArmholes,
  ) =>
    numberOfNecklineRows !== undefined &&
    numberOfRowsAtShoulder !== undefined &&
    numberOfStraightRowsBetweenArmholes !== undefined &&
    numberOfNecklineRows > numberOfRowsAtShoulder &&
    numberOfNecklineRows <=
      numberOfRowsAtShoulder + numberOfStraightRowsBetweenArmholes,
);

export const getFrontArmscyeStitchSum = createSelector(
  [
    getNumberOfStitchesAtBottomOfArmhole,
    getFrontNumberOfStitchesBetweenArmholes,
    getNumberOfRowsOfBottomArmhole,
    getNumberOfStraightRowsBetweenArmholes,
    getNumberOfFrontNecklineRows,
    getNumberOfStitchesAtNeck,
    getNumberOfStitchesForFrontShoulderCastOff,
  ],
  (
    numberOfStitchesAtBottomOfArmhole,
    numberOfStitchesBetweenArmholes,
    numberOfRowsOfBottomArmhole,
    numberOfStraightRowsBetweenArmholes,
    numberOfNecklineRows,
    numberOfStitchesAtNeck,
    numberOfStitchesForFrontShoulderCastOff,
  ) => {
    if (
      !numberOfStitchesAtBottomOfArmhole ||
      !numberOfStitchesBetweenArmholes ||
      !numberOfRowsOfBottomArmhole ||
      !numberOfStraightRowsBetweenArmholes ||
      !numberOfNecklineRows ||
      !numberOfStitchesAtNeck ||
      !numberOfStitchesForFrontShoulderCastOff
    ) {
      return undefined;
    }

    return Math.round(
      calculateHypotenuse(
        numberOfStitchesBetweenArmholes - numberOfStitchesAtBottomOfArmhole,
        numberOfRowsOfBottomArmhole,
      ) +
        numberOfStraightRowsBetweenArmholes +
        calculateHypotenuse(
          numberOfNecklineRows,
          numberOfStitchesAtNeck +
            numberOfStitchesForFrontShoulderCastOff -
            numberOfStitchesBetweenArmholes,
        ),
    );
  },
);

export const getNumberOfStitchesAtWrist = createSelector(
  [getWristWidth, getWidthOfOneStitch],
  divideRoundToEvenNumberAndHalve,
);

export const getNumberOfStitchesAtUnderarm = createSelector(
  [getUnderarmWidth, getWidthOfOneStitch],
  divideRoundToEvenNumberAndHalve,
);

export const getNumberOfStitchesAfterArmholeCastOff = createSelector(
  [getNumberOfStitchesAtUnderarm, getNumberOfArmholeStitchesToCastOff],
  (numberOfStitchesAtUnderarm, numberOfArmholeStitchesToCastOff) => {
    if (!numberOfStitchesAtUnderarm || !numberOfArmholeStitchesToCastOff) {
      return undefined;
    }

    return numberOfStitchesAtUnderarm - numberOfArmholeStitchesToCastOff;
  },
);

export const getNumberOfRowsForSleeveHem = createSelector(
  [getSleeveHemHeight, getHeightOfOneRow],
  divideAndRoundToEvenNumber,
);

export const getNumberOfRowsFromSleeveHemToUnderarm = createSelector(
  [getWristToUnderarm, getNumberOfRowsForSleeveHem, getHeightOfOneRow],
  (wristToUnderarm, numberOfRowsForSleeveHem, heightOfOneRow) => {
    if (!wristToUnderarm || !heightOfOneRow || !numberOfRowsForSleeveHem) {
      return undefined;
    }

    return (
      roundToEvenNumber(wristToUnderarm / heightOfOneRow) -
      numberOfRowsForSleeveHem
    );
  },
);

export const getNumberOfRowsFromUnderarmToSleeveHead = createSelector(
  [getUnderarmToSleeveHead, getHeightOfOneRow],
  divideAndRoundToEvenNumber,
);

export const getNumberOfSleeveHeadStitches = createSelector(
  [getFrontArmscyeStitchSum, getBackArmscyeStitchSum],
  (frontArmscyeStitchSum, backArmscyeStitchSum) => {
    if (!frontArmscyeStitchSum || !backArmscyeStitchSum) {
      return undefined;
    }

    const sum = frontArmscyeStitchSum + backArmscyeStitchSum;

    console.log(frontArmscyeStitchSum, backArmscyeStitchSum);

    return roundToEvenNumber(sum * 0.2) / 2;
  },
);

export const getSleeveArmScyeSlope = createSelector(
  [
    getNumberOfStitchesAfterArmholeCastOff,
    getNumberOfSleeveHeadStitches,
    getNumberOfRowsFromUnderarmToSleeveHead,
  ],
  calculateSlope,
);

export const getSlopeForSleeveIncreases = createSelector(
  [
    getNumberOfStitchesAtWrist,
    getNumberOfStitchesAtUnderarm,
    getNumberOfRowsFromSleeveHemToUnderarm,
  ],
  calculateSlope,
);
