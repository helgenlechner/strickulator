import { createSelector } from 'redux-views';
import { getPatternPieces } from './custom.input.selectors';

export const getWidestNumberOfStitchesForProject = createSelector(
  [getPatternPieces],
  (patternPieces) => {
    const allSteps = patternPieces?.map((piece) => piece.steps).flat();

    allSteps?.map((step) => {});

    console.log(allSteps);
  },
);
