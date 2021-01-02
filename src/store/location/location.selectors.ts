import { createSelector } from 'redux-views';
import { AppState } from '../store.model';

const getLocation = (state: AppState) => state.location;

export const getActiveStepId = createSelector(
  [getLocation],
  (location) => location.activeStep,
);

export const getIsMenuVisible = createSelector(
  [getLocation],
  (location) => location.menuIsVisible,
);
