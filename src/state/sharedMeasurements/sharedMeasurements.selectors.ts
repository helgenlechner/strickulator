import { selector } from 'recoil';
import { roundToEvenNumber } from '../../helpers/rounding';
import { calculateSlope } from '../../helpers/slope';
import {
  getHeightOfOneRow,
  getWidthOfOneStitch,
} from '../swatch/swatch.selectors';
import { sharedMeasurementsState } from './sharedMeasurements.state';

export const getNumberOfHemStitches = selector({
  key: 'getNumberOfHemStitches',
  get: ({ get }) => {
    const sharedMeasurements = get(sharedMeasurementsState);
    const widthOfOneStitch = get(getWidthOfOneStitch);

    if (!sharedMeasurements.hemWidth || !widthOfOneStitch) {
      return undefined;
    }

    return (
      roundToEvenNumber(sharedMeasurements.hemWidth / widthOfOneStitch) / 2
    );
  },
});

export const getNumberOfHemRows = selector({
  key: 'getNumberOfHemRows',
  get: ({ get }) => {
    const sharedMeasurements = get(sharedMeasurementsState);
    const heightOfOneRow = get(getHeightOfOneRow);

    if (!sharedMeasurements.hemHeight || !heightOfOneRow) {
      return undefined;
    }

    return roundToEvenNumber(sharedMeasurements.hemHeight / heightOfOneRow);
  },
});

export const getNumberOfBodiceRows = selector({
  key: 'getNumberOfBodiceRows',
  get: ({ get }) => {
    const sharedMeasurements = get(sharedMeasurementsState);
    const heightOfOneRow = get(getHeightOfOneRow);

    if (!sharedMeasurements.bodiceHeightUntilArmhole || !heightOfOneRow) {
      return undefined;
    }

    return roundToEvenNumber(
      sharedMeasurements.bodiceHeightUntilArmhole / heightOfOneRow,
    );
  },
});

export const getNumberOfStitchesBelowArmhole = selector({
  key: 'getNumberOfStitchesBelowArmhole',
  get: ({ get }) => {
    const sharedMeasurements = get(sharedMeasurementsState);
    const widthOfOneStitch = get(getWidthOfOneStitch);

    if (!sharedMeasurements.widthBelowArmhole || !widthOfOneStitch) {
      return undefined;
    }

    return (
      roundToEvenNumber(
        sharedMeasurements.widthBelowArmhole / widthOfOneStitch,
      ) / 2
    );
  },
});

export const getSlopeForBodiceIncreases = selector({
  key: 'getSlopeForBodiceIncreases',
  get: ({ get }) => {
    const numberOfHemStitches = get(getNumberOfHemStitches);
    const numberOfStitchesBeforeArmhole = get(getNumberOfStitchesBelowArmhole);
    const numberOfBodiceRows = get(getNumberOfBodiceRows);

    return calculateSlope(
      numberOfStitchesBeforeArmhole,
      numberOfHemStitches,
      numberOfBodiceRows,
    );
  },
});

export const getNumberOfArmholeStitchesToCastOff = selector({
  key: 'getNumberOfArmholeStitchesToCastOff',
  get: ({ get }) => {
    const sharedMeasurements = get(sharedMeasurementsState);
    const widthOfOneStitch = get(getWidthOfOneStitch);

    if (!sharedMeasurements.widthOfDecForArmhole || !widthOfOneStitch) {
      return undefined;
    }

    return Math.round(
      sharedMeasurements.widthOfDecForArmhole / widthOfOneStitch,
    );
  },
});

export const getNumberOfStitchesAtBottomOfArmhole = selector({
  key: 'getNumberOfStitchesAtBottomOfArmhole',
  get: ({ get }) => {
    const numberOfArmholeStitchesToCastOff = get(
      getNumberOfArmholeStitchesToCastOff,
    );
    const numberOfStitchesBeforeArmhole = get(getNumberOfStitchesBelowArmhole);

    if (!numberOfArmholeStitchesToCastOff || !numberOfStitchesBeforeArmhole) {
      return undefined;
    }

    return numberOfStitchesBeforeArmhole - numberOfArmholeStitchesToCastOff;
  },
});

export const getNumberOfRowsOfBottomArmhole = selector({
  key: 'getNumberOfRowsOfBottomArmhole',
  get: ({ get }) => {
    const sharedMeasurements = get(sharedMeasurementsState);
    const heightOfOneRow = get(getHeightOfOneRow);

    if (!sharedMeasurements.bottomArmholeHeight || !heightOfOneRow) {
      return undefined;
    }

    return roundToEvenNumber(
      sharedMeasurements.bottomArmholeHeight / heightOfOneRow,
    );
  },
});

export const getNumberOfStraightRowsBetweenArmholes = selector({
  key: 'getNumberOfStraightRowsBetweenArmholes',
  get: ({ get }) => {
    const sharedMeasurements = get(sharedMeasurementsState);
    const heightOfOneRow = get(getHeightOfOneRow);

    if (!sharedMeasurements.heightBetweenArmholes || !heightOfOneRow) {
      return undefined;
    }

    return roundToEvenNumber(
      sharedMeasurements.heightBetweenArmholes / heightOfOneRow,
    );
  },
});
