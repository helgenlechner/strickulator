import { createSelector } from 'redux-views';
import { getProject } from './project.selectors';

const getSwatch = createSelector([getProject], (project) => project?.swatch);

export const getNumberOfSwatchStitches = createSelector(
  [getSwatch],
  (swatch) => swatch?.numberOfStitches,
);

export const getNumberOfSwatchRows = createSelector(
  [getSwatch],
  (swatch) => swatch?.numberOfRows,
);

export const getSwatchWidth = createSelector(
  [getSwatch],
  (swatch) => swatch?.width,
);

export const getSwatchHeight = createSelector(
  [getSwatch],
  (swatch) => swatch?.height,
);

export const getSwatchWeight = createSelector(
  [getSwatch],
  (swatch) => swatch?.weight,
);

export const getWidthOfOneStitch = createSelector(
  [getNumberOfSwatchStitches, getSwatchWidth],
  (numberOfStitches, width) => {
    if (
      width === undefined ||
      numberOfStitches === undefined ||
      numberOfStitches === 0
    ) {
      return undefined;
    }

    return width / numberOfStitches;
  },
);

export const getHeightOfOneRow = createSelector(
  [getNumberOfSwatchRows, getSwatchHeight],
  (numberOfRows, height) => {
    if (
      height === undefined ||
      numberOfRows === undefined ||
      numberOfRows === 0
    ) {
      return undefined;
    }

    return height / numberOfRows;
  },
);

export const getWeightOfOneStitch = createSelector(
  [getSwatchWeight, getNumberOfSwatchStitches, getNumberOfSwatchRows],
  (weight, stitches, rows) => {
    if (!weight || !stitches || !rows) {
      return undefined;
    }

    const numberOfStitches = stitches * rows;

    return weight / numberOfStitches;
  },
);
