import { createSelector } from 'redux-views';
import { isNotUndefined } from '../../../helpers/isNotUndefined';
import { findShapeConfiguration } from '../shapes/findShapeConfiguration';
import { getPatternPieces } from './custom.input.selectors';

export const getWidestWidthForProject = createSelector(
  [getPatternPieces],
  (patternPieces) => {
    if (!patternPieces) {
      return undefined;
    }

    const allSteps = patternPieces.map((piece) => piece.steps).flat();

    return allSteps
      .map((step) => {
        const configuration = findShapeConfiguration(step.shape);

        if (!configuration) {
          return undefined;
        }

        return configuration.getWidestMeasurement(step);
      })
      .filter(isNotUndefined)
      .reduce((maximum, current) => {
        return Math.max(maximum, current);
      }, 0);
  },
);
