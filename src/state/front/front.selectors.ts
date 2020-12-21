import { selector } from 'recoil';
import { roundToEvenNumber } from '../../helpers/rounding';
import { calculateSlope } from '../../helpers/slope';
import {
  getNumberOfRowsOfBottomArmhole,
  getNumberOfStitchesAtBottomOfArmhole,
} from '../sharedMeasurements/sharedMeasurements.selectors';
import {
  getHeightOfOneRow,
  getWidthOfOneStitch,
} from '../swatch/swatch.selectors';
import { frontState } from './front.state';

export const getNumberOfStitchesBetweenArmholes = selector({
  key: 'getFrontNumberOfStitchesBetweenArmholes',
  get: ({ get }) => {
    const front = get(frontState);
    const widthOfOneStitch = get(getWidthOfOneStitch);

    if (!front.widthBetweenArmholes || !widthOfOneStitch) {
      return undefined;
    }

    return roundToEvenNumber(front.widthBetweenArmholes / widthOfOneStitch) / 2;
  },
});

export const getNumberOfLowerBottomArmholeRows = selector({
  key: 'getNumberOfLowerBottomArmholeRows',
  get: ({ get }) => {
    const numberOfRowsOfBottomArmhole = get(getNumberOfRowsOfBottomArmhole);

    if (!numberOfRowsOfBottomArmhole) {
      return undefined;
    }

    return roundToEvenNumber(numberOfRowsOfBottomArmhole * 0.4);
  },
});

export const getNumberOfStitchesAfterLowerBottomArmholeDecreases = selector({
  key: 'getNumberOfStitchesAfterLowerBottomArmholeDecreases',
  get: ({ get }) => {
    const numberOfStitchesBetweenArmholes = get(
      getNumberOfStitchesBetweenArmholes,
    );
    const numberOfStitchesAtBottomOfArmhole = get(
      getNumberOfStitchesAtBottomOfArmhole,
    );

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
});

export const getSlopeForLowerBottomArmholeDecreases = selector({
  key: 'getSlopeForLowerBottomArmholeDecreases',
  get: ({ get }) => {
    const numberOfStitchesAtBottomOfArmhole = get(
      getNumberOfStitchesAtBottomOfArmhole,
    );
    const numberOfStitchesBetweenArmholes = get(
      getNumberOfStitchesBetweenArmholes,
    );
    const numberOfRowsOfLowerBottomArmhole = get(
      getNumberOfLowerBottomArmholeRows,
    );
    const numberOfStitchesAfterLowerBottomArmholeDecreases = get(
      getNumberOfStitchesAfterLowerBottomArmholeDecreases,
    );

    if (
      !numberOfStitchesAtBottomOfArmhole ||
      !numberOfStitchesBetweenArmholes ||
      !numberOfRowsOfLowerBottomArmhole ||
      !numberOfStitchesAfterLowerBottomArmholeDecreases
    ) {
      return undefined;
    }

    return calculateSlope(
      numberOfStitchesAtBottomOfArmhole,
      numberOfStitchesAfterLowerBottomArmholeDecreases,
      numberOfRowsOfLowerBottomArmhole,
    );
  },
});

export const getNumberOfUpperBottomArmholeRows = selector({
  key: 'getNumberOfUpperBottomArmholeRows',
  get: ({ get }) => {
    const numberOfRowsOfBottomArmhole = get(getNumberOfRowsOfBottomArmhole);
    const numberOfRowsOfLowerBottomArmhole = get(
      getNumberOfLowerBottomArmholeRows,
    );

    if (!numberOfRowsOfBottomArmhole || !numberOfRowsOfLowerBottomArmhole) {
      return undefined;
    }

    return numberOfRowsOfBottomArmhole - numberOfRowsOfLowerBottomArmhole;
  },
});

export const getSlopeForUpperBottomArmholeDecreases = selector({
  key: 'getSlopeForUpperBottomArmholeDecreases',
  get: ({ get }) => {
    const numberOfStitchesBetweenArmholes = get(
      getNumberOfStitchesBetweenArmholes,
    );
    const numberOfRowsOfUpperBottomArmhole = get(
      getNumberOfUpperBottomArmholeRows,
    );
    const numberOfStitchesAfterLowerBottomArmholeDecreases = get(
      getNumberOfStitchesAfterLowerBottomArmholeDecreases,
    );

    if (
      !numberOfStitchesBetweenArmholes ||
      !numberOfRowsOfUpperBottomArmhole ||
      !numberOfStitchesAfterLowerBottomArmholeDecreases
    ) {
      return undefined;
    }

    return calculateSlope(
      numberOfStitchesAfterLowerBottomArmholeDecreases,
      numberOfStitchesBetweenArmholes,
      numberOfRowsOfUpperBottomArmhole,
    );
  },
});
