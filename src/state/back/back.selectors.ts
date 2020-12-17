import { selector } from 'recoil';
import { roundToEvenNumber } from '../../helpers/rounding';
import { calculateSlope } from '../../helpers/slope';
import {
  getHeightOfOneRow,
  getWidthOfOneStitch,
} from '../swatch/swatch.selectors';
import { backState } from './back.state';

export const getNumberOfHemStitches = selector({
  key: 'getNumberOfHemStitches',
  get: ({ get }) => {
    const back = get(backState);
    const widthOfOneStitch = get(getWidthOfOneStitch);

    if (!back.hemWidth || !widthOfOneStitch) {
      return undefined;
    }

    return roundToEvenNumber(back.hemWidth / widthOfOneStitch);
  },
});

export const getNumberOfHemRows = selector({
  key: 'getNumberOfHemRows',
  get: ({ get }) => {
    const back = get(backState);
    const heightOfOneRow = get(getHeightOfOneRow);

    if (!back.hemHeight || !heightOfOneRow) {
      return undefined;
    }

    return roundToEvenNumber(back.hemHeight / heightOfOneRow);
  },
});

export const getNumberOfBodiceRows = selector({
  key: 'getNumberOfBodiceRows',
  get: ({ get }) => {
    const back = get(backState);
    const heightOfOneRow = get(getHeightOfOneRow);

    if (!back.bodiceHeightUntilArmhole || !heightOfOneRow) {
      return undefined;
    }

    return roundToEvenNumber(back.bodiceHeightUntilArmhole / heightOfOneRow);
  },
});

export const getNumberOfStitchesBeforeArmhole = selector({
  key: 'getNumberOfStitchesBeforeArmhole',
  get: ({ get }) => {
    const back = get(backState);
    const widthOfOneStitch = get(getWidthOfOneStitch);

    if (!back.widthBelowArmhole || !widthOfOneStitch) {
      return undefined;
    }

    return roundToEvenNumber(back.widthBelowArmhole / widthOfOneStitch);
  },
});

export const getSlopeForBodiceIncreases = selector({
  key: 'getSlopeForBodiceIncreases',
  get: ({ get }) => {
    const numberOfHemStitches = get(getNumberOfHemStitches);
    const numberOfStitchesBeforeArmhole = get(getNumberOfStitchesBeforeArmhole);
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
    const back = get(backState);
    const widthOfOneStitch = get(getWidthOfOneStitch);

    if (!back.widthOfDecForArmhole || !widthOfOneStitch) {
      return undefined;
    }

    return Math.round(back.widthOfDecForArmhole / widthOfOneStitch);
  },
});

export const getNumberOfStitchesAtBottomOfArmhole = selector({
  key: 'getNumberOfStitchesAtBottomOfArmhole',
  get: ({ get }) => {
    const numberOfArmholeStitchesToCastOff = get(
      getNumberOfArmholeStitchesToCastOff,
    );
    const numberOfStitchesBeforeArmhole = get(getNumberOfStitchesBeforeArmhole);

    if (!numberOfArmholeStitchesToCastOff || !numberOfStitchesBeforeArmhole) {
      return undefined;
    }

    return numberOfStitchesBeforeArmhole - numberOfArmholeStitchesToCastOff * 2;
  },
});

export const getNumberOfRowsOfBottomArmhole = selector({
  key: 'getNumberOfRowsOfBottomArmhole',
  get: ({ get }) => {
    const back = get(backState);
    const heightOfOneRow = get(getHeightOfOneRow);

    if (!back.bottomArmholeHeight || !heightOfOneRow) {
      return undefined;
    }

    return roundToEvenNumber(back.bottomArmholeHeight / heightOfOneRow);
  },
});

export const getNumberOfStitchesBetweenArmholes = selector({
  key: 'getNumberOfStitchesBetweenArmholes',
  get: ({ get }) => {
    const back = get(backState);
    const widthOfOneStitch = get(getWidthOfOneStitch);

    if (!back.widthBetweenArmholes || !widthOfOneStitch) {
      return undefined;
    }

    return roundToEvenNumber(back.widthBetweenArmholes / widthOfOneStitch);
  },
});

export const getSlopeForBottomArmholeDecreases = selector({
  key: 'getSlopeForBottomArmholeDecreases',
  get: ({ get }) => {
    const numberOfStitchesAtBottomOfArmhole = get(
      getNumberOfStitchesAtBottomOfArmhole,
    );
    const numberOfStitchesBetweenArmholes = get(
      getNumberOfStitchesBetweenArmholes,
    );
    const numberOfRowsOfBottomArmhole = get(getNumberOfRowsOfBottomArmhole);

    return calculateSlope(
      numberOfStitchesAtBottomOfArmhole,
      numberOfStitchesBetweenArmholes,
      numberOfRowsOfBottomArmhole,
    );
  },
});

export const getNumberOfStraightRowsBetweenArmholes = selector({
  key: 'getNumberOfStraightRowsBetweenArmholes',
  get: ({ get }) => {
    const back = get(backState);
    const heightOfOneRow = get(getHeightOfOneRow);

    if (!back.heightBetweenArmholes || !heightOfOneRow) {
      return undefined;
    }

    return roundToEvenNumber(back.heightBetweenArmholes / heightOfOneRow);
  },
});

export const getNumberOfStitchesAtNeck = selector({
  key: 'getNumberOfStitchesAtNeck',
  get: ({ get }) => {
    const back = get(backState);
    const widthOfOneStitch = get(getWidthOfOneStitch);

    if (!back.neckWidth || !widthOfOneStitch) {
      return undefined;
    }

    return roundToEvenNumber(back.neckWidth / widthOfOneStitch);
  },
});

export const getNumberOfRowsBelowNeck = selector({
  key: 'getNumberOfRowsBelowNeck',
  get: ({ get }) => {
    const back = get(backState);
    const heightOfOneRow = get(getHeightOfOneRow);

    if (!back.heightAtShoulders || !heightOfOneRow) {
      return undefined;
    }

    return roundToEvenNumber(back.heightAtShoulders / heightOfOneRow);
  },
});

export const getSlopeForNeckDecreases = selector({
  key: 'getSlopeForNeckDecreases',
  get: ({ get }) => {
    const numberOfStitchesBetweenArmholes = get(
      getNumberOfStitchesBetweenArmholes,
    );
    const numberOfStitchesAtNeck = get(getNumberOfStitchesAtNeck);
    const numberOfRowsBelowNeck = get(getNumberOfRowsBelowNeck);

    return calculateSlope(
      numberOfStitchesBetweenArmholes,
      numberOfStitchesAtNeck,
      numberOfRowsBelowNeck,
    );
  },
});
