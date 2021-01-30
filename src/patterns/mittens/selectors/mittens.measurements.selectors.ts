import { createSelector } from 'redux-views';
import { getProject } from '../../../store/project/project.selectors';
import { MittensMeasuremets } from '../mittens.model';

const getMeasurements = createSelector(
  [getProject],
  (project): MittensMeasuremets | undefined => project?.measurements,
);

export const getCuffHeight = createSelector(
  [getMeasurements],
  (measurements) => measurements?.cuffHeight,
);

export const getHandCircumference = createSelector(
  [getMeasurements],
  (measurements) => measurements?.handCircumference,
);

export const getThumbCircumference = createSelector(
  [getMeasurements],
  (measurements) => measurements?.thumbCircumference,
);

export const getHandLength = createSelector(
  [getMeasurements],
  (measurements) => measurements?.handLength,
);

export const getThumbLength = createSelector(
  [getMeasurements],
  (measurements) => measurements?.thumbLength,
);

export const getThumbRootLength = createSelector(
  [getMeasurements],
  (measurements) => measurements?.thumbRootLength,
);

export const getTipWidth = createSelector(
  [getMeasurements],
  (measurements) => measurements?.tipWidth,
);

export const getIndexFingerSideTipHeight = createSelector(
  [getMeasurements],
  (measurements) => measurements?.indexFingerSideTipHeight,
);

export const getPinkieSideTipHeight = createSelector(
  [getMeasurements],
  (measurements) => measurements?.pinkieSideTipHeight,
);
