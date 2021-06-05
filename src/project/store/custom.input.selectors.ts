import { createSelector } from 'redux-views';
import { getProject } from '../../store/project/project.selectors';
import { AppState } from '../../store/store.model';
import { CustomMeasurements } from './custom.model';

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

const getMeasuruments = createSelector(
  [getProject],
  (project): CustomMeasurements | undefined => project?.measurements,
);

export const getPatternPieces = createSelector(
  [getMeasuruments],
  (measurements) => measurements?.patternPieces,
);

export const getPatternPiece = createSelector(
  [getPatternPieces, getPatternPieceIndexFromProps],
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
