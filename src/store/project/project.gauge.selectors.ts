import { createSelector } from 'redux-views';
import { calculateSlope } from '../../helpers/slope';
import { getProject } from './project.selectors';
import {
  getHeightOfOneRow,
  getWidthOfOneStitch,
} from './project.swatch.selectors';

const getGauge = createSelector([getProject], (project) => project?.gauge);

export const getGaugeWidth = createSelector(
  [getGauge],
  (gauge) => gauge?.width,
);

export const getGaugeHeight = createSelector(
  [getGauge],
  (gauge) => gauge?.height,
);

export const getGaugeSlopeWidth = createSelector(
  [getGauge],
  (gauge) => gauge?.slopeWidth,
);

export const getGaugeSlopeHeight = createSelector(
  [getGauge],
  (gauge) => gauge?.slopeHeight,
);

export const getGaugeNumberOfStitches = createSelector(
  [getGaugeWidth, getWidthOfOneStitch],
  (width, widthOfOneStitch) => {
    if (!width || !widthOfOneStitch) {
      return undefined;
    }

    return (width / widthOfOneStitch).toFixed(1);
  },
);

export const getGaugeNumberOfRows = createSelector(
  [getGaugeHeight, getHeightOfOneRow],
  (height, heightOfOneRow) => {
    if (!height || !heightOfOneRow) {
      return undefined;
    }

    return (height / heightOfOneRow).toFixed(1);
  },
);

export const getGaugeSlopeNumberOfStitches = createSelector(
  [getGaugeSlopeWidth, getWidthOfOneStitch],
  (width, widthOfOneStitch) => {
    if (!width || !widthOfOneStitch) {
      return undefined;
    }

    return Math.round(width / widthOfOneStitch);
  },
);

export const getGaugeSlopeNumberOfRows = createSelector(
  [getGaugeSlopeHeight, getHeightOfOneRow],
  (height, heightOfOneRow) => {
    if (!height || !heightOfOneRow) {
      return undefined;
    }

    return Math.round(height / heightOfOneRow);
  },
);

export const getGaugeSlope = createSelector(
  [getGaugeSlopeNumberOfStitches, getGaugeSlopeNumberOfRows],
  (numberOfStitches, numberOfRows) => {
    return calculateSlope(0, numberOfStitches, numberOfRows);
  },
);
