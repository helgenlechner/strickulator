import { selector } from 'recoil';
import { roundToEvenNumber } from '../../helpers/rounding';
import { calculateSlope } from '../../helpers/slope';
import { getBackArmscyeStitchSum } from '../back/back.selectors';
import { getFrontArmscyeStitchSum } from '../front/front.selectors';
import { getNumberOfArmholeStitchesToCastOff } from '../sharedMeasurements/sharedMeasurements.selectors';
import {
  getHeightOfOneRow,
  getWidthOfOneStitch,
} from '../swatch/swatch.selectors';
import { sleeveState } from './sleeve.state';

export const getNumberOfStitchesAtWrist = selector({
  key: 'getNumberOfStitchesAtWrist',
  get: ({ get }) => {
    const sleeve = get(sleeveState);
    const widthOfOneStitch = get(getWidthOfOneStitch);

    if (!sleeve.wristWidth || !widthOfOneStitch) {
      return undefined;
    }

    return roundToEvenNumber(sleeve.wristWidth / widthOfOneStitch) / 2;
  },
});

export const getNumberOfStitchesAtUnderarm = selector({
  key: 'getNumberOfStitchesAtUnderarm',
  get: ({ get }) => {
    const sleeve = get(sleeveState);
    const widthOfOneStitch = get(getWidthOfOneStitch);

    if (!sleeve.underarmWidth || !widthOfOneStitch) {
      return undefined;
    }

    return roundToEvenNumber(sleeve.underarmWidth / widthOfOneStitch) / 2;
  },
});

export const getNumberOfStitchesAfterArmholeCastOff = selector({
  key: 'getNumberOfStitchesAfterArmholeCastOff',
  get: ({ get }) => {
    const numberOfStitchesAtUnderarm = get(getNumberOfStitchesAtUnderarm);
    const numberOfArmholeStitchesToCastOff = get(
      getNumberOfArmholeStitchesToCastOff,
    );

    if (!numberOfStitchesAtUnderarm || !numberOfArmholeStitchesToCastOff) {
      return undefined;
    }

    return numberOfStitchesAtUnderarm - numberOfArmholeStitchesToCastOff;
  },
});

export const getNumberOfRowsForSleeveHem = selector({
  key: 'getNumberOfRowsForSleeveHem',
  get: ({ get }) => {
    const sleeve = get(sleeveState);
    const heightOfOneRow = get(getHeightOfOneRow);

    if (!sleeve.hemHeight || !heightOfOneRow) {
      return undefined;
    }

    return roundToEvenNumber(sleeve.hemHeight / heightOfOneRow);
  },
});

export const getNumberOfRowsFromSleeveHemToUnderarm = selector({
  key: 'getNumberOfRowsFromSleeveHemToUnderarm',
  get: ({ get }) => {
    const sleeve = get(sleeveState);
    const hemNumberOfRows = get(getNumberOfRowsForSleeveHem);
    const heightOfOneRow = get(getHeightOfOneRow);

    if (!sleeve.underarmToWrist || !heightOfOneRow || !hemNumberOfRows) {
      return undefined;
    }

    return (
      roundToEvenNumber(sleeve.underarmToWrist / heightOfOneRow) -
      hemNumberOfRows
    );
  },
});

export const getNumberOfRowsFromUnderarmToSleeveHead = selector({
  key: 'getNumberOfRowsFromUnderarmToSleeveHead',
  get: ({ get }) => {
    const sleeve = get(sleeveState);
    const heightOfOneRow = get(getHeightOfOneRow);

    if (!sleeve.underarmToSleeveHead || !heightOfOneRow) {
      return undefined;
    }

    return roundToEvenNumber(sleeve.underarmToSleeveHead / heightOfOneRow);
  },
});

export const getNumberOfSleeveHeadStitches = selector({
  key: 'getNumberOfSleeveHeadStitches',
  get: ({ get }) => {
    const frontArmscyeStitchSum = get(getFrontArmscyeStitchSum);
    const backArmscyeStitchSum = get(getBackArmscyeStitchSum);

    if (!frontArmscyeStitchSum || !backArmscyeStitchSum) {
      return undefined;
    }

    console.log(frontArmscyeStitchSum, backArmscyeStitchSum);

    const sum = frontArmscyeStitchSum + backArmscyeStitchSum;

    return roundToEvenNumber(sum * 0.2) / 2;
  },
});

export const getSleeveArmScyeSlope = selector({
  key: 'getSleeveArmScyeSlope',
  get: ({ get }) => {
    const numberOfRowsFromUnderarmToSleeveHead = get(
      getNumberOfRowsFromUnderarmToSleeveHead,
    );
    const numberOfStitchesAfterArmholeCastOff = get(
      getNumberOfStitchesAfterArmholeCastOff,
    );
    const numberOfSleeveHeadStitches = get(getNumberOfSleeveHeadStitches);

    if (
      !numberOfRowsFromUnderarmToSleeveHead ||
      !numberOfStitchesAfterArmholeCastOff ||
      !numberOfSleeveHeadStitches
    ) {
      return undefined;
    }

    return calculateSlope(
      numberOfStitchesAfterArmholeCastOff,
      numberOfSleeveHeadStitches,
      numberOfRowsFromUnderarmToSleeveHead,
    );
  },
});

export const getSlopeForSleeveIncreases = selector({
  key: 'getSlopeForSleeveIncreases',
  get: ({ get }) => {
    const numberOfRowsFromSleeveHemToUnderarm = get(
      getNumberOfRowsFromSleeveHemToUnderarm,
    );
    const numberOfStitchesAtWrist = get(getNumberOfStitchesAtWrist);
    const numberOfStitchesAtUnderarm = get(getNumberOfStitchesAtUnderarm);

    if (
      !numberOfRowsFromSleeveHemToUnderarm ||
      !numberOfStitchesAtUnderarm ||
      !numberOfStitchesAtWrist
    ) {
      return undefined;
    }

    return calculateSlope(
      numberOfStitchesAtWrist,
      numberOfStitchesAtUnderarm,
      numberOfRowsFromSleeveHemToUnderarm,
    );
  },
});
