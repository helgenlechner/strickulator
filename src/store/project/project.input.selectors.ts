import { createSelector } from 'redux-views';
import { getProject } from './project.selectors';
import { AppState } from '../store.model';

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

export const getPatternPieces = createSelector(
  [getProject],
  (project) => {
    console.log(project);
    return project?.patternPieces;
  },
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
