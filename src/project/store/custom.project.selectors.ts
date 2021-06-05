import { createSelector } from 'redux-views';
import { isNotUndefined } from '../../helpers/isNotUndefined';
import { KnittingStyle } from '../../store/project/project.model';
import {
  getHeightOfOneRow,
  getWeightOfOneStitch,
  getWidthOfOneStitch,
} from '../../store/project/project.swatch.selectors';
import { findShapeConfiguration } from '../shapes/findShapeConfiguration';
import { getPatternPieces, getStep, getSteps } from './custom.input.selectors';
import { previewWidth, leftHalfOfPattern } from './custom.model';

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

export const getKnittingStyle = createSelector(
  [getStep],
  (step) => step?.knittingStyle ?? KnittingStyle.flat,
);

export const getIsKnittedInTheRound = createSelector(
  [getKnittingStyle],
  (knittingStyle) => knittingStyle === KnittingStyle.inTheRound,
);

export const getEstimatedWeightOfPatternPiece = createSelector(
  [getSteps, getWeightOfOneStitch, getWidthOfOneStitch, getHeightOfOneRow],
  (steps, weightOfOneStitch, widthOfOneStitch, heightOfOneRow) => {
    if (!steps || !weightOfOneStitch || !widthOfOneStitch || !heightOfOneRow) {
      return;
    }

    return steps.reduce((total, currentStep) => {
      const configuration = findShapeConfiguration(currentStep.shape);
      const numberOfStitches = configuration?.getNumberOfStiches(
        currentStep,
        widthOfOneStitch,
        heightOfOneRow,
      );

      if (!numberOfStitches) {
        return total;
      }

      return total + numberOfStitches * weightOfOneStitch;
    }, 0);
  },
);
