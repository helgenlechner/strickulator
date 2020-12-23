import { selector } from 'recoil';
import { calculateHypotenuse } from '../../helpers/hypotenuse';
import { roundToEvenNumber } from '../../helpers/rounding';
import { calculateSlope } from '../../helpers/slope';
import {
  getNumberOfRowsOfBottomArmhole,
  getNumberOfStitchesAtBottomOfArmhole,
  getNumberOfStraightRowsBetweenArmholes,
} from '../sharedMeasurements/sharedMeasurements.selectors';
import {
  getHeightOfOneRow,
  getWidthOfOneStitch,
} from '../swatch/swatch.selectors';
import { backState } from './back.state';

export const getNumberOfStitchesBetweenArmholes = selector({
  key: 'getBackNumberOfStitchesBetweenArmholes',
  get: ({ get }) => {
    const back = get(backState);
    const widthOfOneStitch = get(getWidthOfOneStitch);

    if (!back.widthBetweenArmholes || !widthOfOneStitch) {
      return undefined;
    }

    return roundToEvenNumber(back.widthBetweenArmholes / widthOfOneStitch) / 2;
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

export const getNumberOfStitchesAtNeck = selector({
  key: 'getNumberOfStitchesAtNeck',
  get: ({ get }) => {
    const back = get(backState);
    const widthOfOneStitch = get(getWidthOfOneStitch);

    if (!back.neckWidth || !widthOfOneStitch) {
      return undefined;
    }

    return roundToEvenNumber(back.neckWidth / widthOfOneStitch) / 2;
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

export const getBackArmscyeStitchSum = selector({
  key: 'getBackArmscyeStitchSum',
  get: ({ get }) => {
    const numberOfStitchesAtBottomOfArmhole = get(
      getNumberOfStitchesAtBottomOfArmhole,
    );
    const numberOfStitchesBetweenArmholes = get(
      getNumberOfStitchesBetweenArmholes,
    );
    const numberOfRowsOfBottomArmhole = get(getNumberOfRowsOfBottomArmhole);
    const numberOfStraightRowsBetweenArmholes = get(
      getNumberOfStraightRowsBetweenArmholes,
    );

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
});
