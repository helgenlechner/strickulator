import { selector } from 'recoil';
import { calculateHypotenuse } from '../../helpers/hypotenuse';
import { roundToEvenNumber } from '../../helpers/rounding';
import { calculateSlope } from '../../helpers/slope';
import {
  getNumberOfStitchesAtNeck,
  getSlopeForNeckDecreases,
} from '../back/back.selectors';
import {
  getNumberOfRowsOfBottomArmhole,
  getNumberOfStitchesAtBottomOfArmhole,
  getNumberOfStraightRowsBetweenArmholes,
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

export const getNumberOfRowsAtShoulder = selector({
  key: 'getNumberOfRowsAtShoulder',
  get: ({ get }) => {
    const front = get(frontState);
    const heightOfOneRow = get(getHeightOfOneRow);

    if (!front.heightAtShoulders || !heightOfOneRow) {
      return undefined;
    }

    return roundToEvenNumber(front.heightAtShoulders / heightOfOneRow);
  },
});

export const getNumberOfStitchesForFrontShoulderCastOff = selector({
  key: 'getNumberOfStitchesForFrontShoulderCastOff',
  get: ({ get }) => {
    const backShoulderSlope = get(getSlopeForNeckDecreases);

    if (!backShoulderSlope) {
      return undefined;
    }

    return backShoulderSlope.delta;
  },
});

export const getFrontArmscyeSlope = selector({
  key: 'getFrontArmscyeSlope',
  get: ({ get }) => {
    const numberOfStitchesAtNeck = get(getNumberOfStitchesAtNeck);
    const numberOfStitchesBetweenArmholes = get(
      getNumberOfStitchesBetweenArmholes,
    );
    const numberOfStitchesForFrontShoulderCastOff = get(
      getNumberOfStitchesForFrontShoulderCastOff,
    );
    const numberOfRowsAtShoulder = get(getNumberOfRowsAtShoulder);

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
});

export const getNumberOfNecklineRows = selector({
  key: 'getNumberOfNecklineRows',
  get: ({ get }) => {
    const front = get(frontState);
    const heightOfOneRow = get(getHeightOfOneRow);

    if (!front.necklineDepth || !heightOfOneRow) {
      return undefined;
    }

    return roundToEvenNumber(front.necklineDepth / heightOfOneRow);
  },
});

export const getFrontNecklineSlope = selector({
  key: 'getFrontNecklineSlope',
  get: ({ get }) => {
    const numberOfStitchesAtNeck = get(getNumberOfStitchesAtNeck);
    const numberOfNecklineRows = get(getNumberOfNecklineRows);

    if (!numberOfStitchesAtNeck || !numberOfNecklineRows) {
      return undefined;
    }

    return calculateSlope(numberOfStitchesAtNeck, 0, numberOfNecklineRows);
  },
});

export const getFrontArmscyeStitchSum = selector({
  key: 'getFrontArmscyeStitchSum',
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
    const numberOfNecklineRows = get(getNumberOfNecklineRows);
    const numberOfStitchesAtNeck = get(getNumberOfStitchesAtNeck);
    const numberOfStitchesForFrontShoulderCastOff = get(
      getNumberOfStitchesForFrontShoulderCastOff,
    );

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
});
