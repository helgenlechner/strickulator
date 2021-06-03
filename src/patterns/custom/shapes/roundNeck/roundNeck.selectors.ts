import { createSelector } from 'redux-views';
import { divideAndRoundToEvenNumber } from '../../../../helpers/divideAndRoundToEvenNumber';
import { divideRoundToEvenNumberAndHalve } from '../../../../helpers/divideRoundToEvenNumberAndHalve';
import { ellipseCartesianFunction } from '../../../../helpers/ellipseCartesianFunction';
import { UnevenSlope } from '../../../../helpers/slope';
import {
  getWidthOfOneStitch,
  getHeightOfOneRow,
} from '../../../../store/project/project.swatch.selectors';
import { getStep } from '../../store/custom.input.selectors';
import { Shape } from '../../custom.model';

export const getBottomWidth = createSelector([getStep], (step) => {
  if (step?.shape === Shape.RoundNeck) {
    return step?.bottomWidth;
  }

  return undefined;
});

export const getTopWidth = createSelector([getStep], (step) => {
  if (step?.shape === Shape.RoundNeck) {
    return step?.topWidth;
  }

  return undefined;
});

export const getHeight = createSelector([getStep], (step) => {
  if (step?.shape === Shape.RoundNeck) {
    return step?.height;
  }

  return undefined;
});

export const getNumberOfBottomStitches = createSelector(
  [getBottomWidth, getWidthOfOneStitch],
  divideRoundToEvenNumberAndHalve,
);

export const getNumberOfTopStitches = createSelector(
  [getTopWidth, getWidthOfOneStitch],
  divideAndRoundToEvenNumber,
);

export const getNumberOfRows = createSelector(
  [getHeight, getHeightOfOneRow],
  divideAndRoundToEvenNumber,
);

export const getNeckCurve = createSelector(
  [getNumberOfBottomStitches, getNumberOfTopStitches, getNumberOfRows],
  (numberOfBottomStitches, numberOfTopStitches, numberOfRows) => {
    if (!numberOfBottomStitches || !numberOfTopStitches || !numberOfRows) {
      return undefined;
    }

    const baselineDecrease = Math.round(
      (numberOfBottomStitches - numberOfTopStitches) * 0.28,
    );

    const a = numberOfBottomStitches - numberOfTopStitches - baselineDecrease;
    const b = numberOfRows;

    const pattern: UnevenSlope['pattern'] = { 0: baselineDecrease };

    for (let y = 2; y <= numberOfRows; y += 2) {
      const x = Math.round(ellipseCartesianFunction(a, b, y));

      const previousX =
        y === 0
          ? baselineDecrease * -1
          : Math.round(ellipseCartesianFunction(a, b, y - 2));

      pattern[y] = x - previousX;
    }

    return pattern;
  },
);
