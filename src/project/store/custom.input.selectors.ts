import { createSelector } from 'redux-views';
import { getProject } from '../../store/project/project.selectors';
import { AppState } from '../../store/store.model';

const getPatternPieceIndexFromProps = <
  Props extends { patternPieceIndex: number },
>(
  state: AppState,
  props: Props,
) => props.patternPieceIndex;

const getStepIndexFromProps = <Props extends { stepIndex: number }>(
  state: AppState,
  props: Props,
) => props.stepIndex;

export const getMeasurements = createSelector(
  [getProject],
  (project) => project?.patternPieces,
);

export const getPatternPiece = createSelector(
  [getMeasurements, getPatternPieceIndexFromProps],
  (patternPieces, index) => patternPieces?.[index],
);

export const getSteps = createSelector(
  [getPatternPiece],
  (patternPiece) => patternPiece?.steps,
);

export const getStep = createSelector(
  [getSteps, getStepIndexFromProps],
  (steps, stepIndex) => steps?.[stepIndex],
);
