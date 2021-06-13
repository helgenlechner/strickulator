import { createSelector } from 'redux-views';
import { findShapeConfiguration } from '../../project/shapes/findShapeConfiguration';
import { getSteps } from './project.input.selectors';
import {
  getWeightOfOneStitch,
  getWidthOfOneStitch,
  getHeightOfOneRow,
} from './project.swatch.selectors';

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
