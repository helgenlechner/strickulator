import { createSelector } from 'redux-views';
import { previewWidth, leftHalfOfPattern } from '../../constants/preview';
import { isNotUndefined } from '../../helpers/isNotUndefined';
import { findShapeConfiguration } from '../../project/shapes/findShapeConfiguration';
import { getPatternPieces } from './project.input.selectors';

export const getWidestWidthForProject = createSelector(
  [getPatternPieces],
  (patternPieces) => {
    if (!patternPieces) {
      return undefined;
    }

    return patternPieces
      .map((piece) => piece.steps)
      .flat()
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

export const getScaleFactorForProject = createSelector(
  [getWidestWidthForProject],
  (widestWidth) => {
    if (!previewWidth || !widestWidth) {
      return undefined;
    }

    return Math.floor((previewWidth - leftHalfOfPattern) / (widestWidth / 2));
  },
);
