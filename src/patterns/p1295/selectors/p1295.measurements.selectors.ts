import { createSelector } from 'redux-views';
import { Project } from '../../../store/project/project.model';
import { AppState } from '../../../store/store.model';

const getProject = (state: AppState): Project | undefined =>
  state.projects['0'];

const getMeasurements = createSelector(
  [getProject],
  (project) => project?.measurements,
);

export const getBackWidthBetweenArmholes = createSelector(
  [getMeasurements],
  (measurements) => measurements?.backWidthBetweenArmholes,
);

export const getBackHeightAtShoulders = createSelector(
  [getMeasurements],
  (measurements) => measurements?.backHeightAtShoulders,
);

export const getNeckWidth = createSelector(
  [getMeasurements],
  (measurements) => measurements?.neckWidth,
);

export const getFrontWidthBetweenArmholes = createSelector(
  [getMeasurements],
  (measurements) => measurements?.frontWidthBetweenArmholes,
);

export const getFrontHeightAtShoulders = createSelector(
  [getMeasurements],
  (measurements) => measurements?.frontHeightAtShoulders,
);

export const getNecklineDepth = createSelector(
  [getMeasurements],
  (measurements) => measurements?.necklineDepth,
);

export const getHemWidth = createSelector(
  [getMeasurements],
  (measurements) => measurements?.hemWidth,
);

export const getHemHeight = createSelector(
  [getMeasurements],
  (measurements) => measurements?.hemHeight,
);

export const getWidthBelowArmhole = createSelector(
  [getMeasurements],
  (measurements) => measurements?.widthBelowArmhole,
);

export const getBodiceHeightUntilArmhole = createSelector(
  [getMeasurements],
  (measurements) => measurements?.bodiceHeightUntilArmhole,
);

export const getWidthOfDecForArmhole = createSelector(
  [getMeasurements],
  (measurements) => measurements?.widthOfDecForArmhole,
);

export const getBottomArmholeHeight = createSelector(
  [getMeasurements],
  (measurements) => measurements?.bottomArmholeHeight,
);

export const getHeightBetweenArmholes = createSelector(
  [getMeasurements],
  (measurements) => measurements?.heightBetweenArmholes,
);

export const getWristWidth = createSelector(
  [getMeasurements],
  (measurements) => measurements?.wristWidth,
);

export const getSleeveHemHeight = createSelector(
  [getMeasurements],
  (measurements) => measurements?.sleeveHemHeight,
);

export const getUnderarmWidth = createSelector(
  [getMeasurements],
  (measurements) => measurements?.underarmWidth,
);

export const getWristToUnderarm = createSelector(
  [getMeasurements],
  (measurements) => measurements?.underarmToWrist,
);

export const getUnderarmToSleeveHead = createSelector(
  [getMeasurements],
  (measurements) => measurements?.underarmToSleeveHead,
);
