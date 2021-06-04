import { createSelector } from 'redux-views';
import { divideAndRoundToEvenNumber } from '../../../helpers/divideAndRoundToEvenNumber';
import { divideRoundToEvenNumberAndHalve } from '../../../helpers/divideRoundToEvenNumberAndHalve';
import { ellipseCartesianFunction } from '../../../helpers/ellipseCartesianFunction';
import { UnevenSlope } from '../../../helpers/slope';
import {
  getWidthOfOneStitch,
  getHeightOfOneRow,
} from '../../../store/project/project.swatch.selectors';
import { getStep } from '../../store/custom.input.selectors';
import { isRoundNeck } from './roundNeck.model';

export const getRoundNeck = createSelector([getStep], (step) =>
  isRoundNeck(step) ? step : undefined,
);

export const getBottomWidth = createSelector(
  [getRoundNeck],
  (step) => step?.bottomWidth,
);

export const getTopWidth = createSelector(
  [getRoundNeck],
  (step) => step?.topWidth,
);

export const getHeight = createSelector([getRoundNeck], (step) => step?.height);

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
  (
    numberOfBottomStitches,
    numberOfTopStitches,
    numberOfRows,
  ): UnevenSlope | undefined => {
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

      if (x - previousX > 0) {
        pattern[y] = x - previousX;
      }
    }

    return {
      type: '-',
      delta: Object.values(pattern).reduce(
        (total, current) => (total += current),
        0,
      ),
      numberOfRows,
      pattern,
    };
  },
);
