import { ProjectId } from '../../store/project/project.model';
import { Shape } from './custom.model';

export enum CustomProjectActions {
  addPatternPiece = '@@customProject/ADD_PATTERN_PIECE',
  updatePatternPieceName = '@@customProject/UPDATE_PATTERN_PIECE_NAME',
  addStep = '@@customProject/ADD_STEP',
  updateStepName = '@@customProject/UPDATE_STEP_NAME',
  updateStepShape = '@@customProject/UPDATE_STEP_SHAPE',
  updateStepMeasurement = '@@customProject/UPDATE_STEP_MEASUREMENT',
}

export const customProjectAddPatternPiece = (id: ProjectId) => ({
  type: CustomProjectActions.addPatternPiece,
  payload: { id },
});

export const customProjectUpdatePatternPieceName = (
  id: ProjectId,
  patternPieceIndex: number,
  name: string,
) => ({
  type: CustomProjectActions.updatePatternPieceName,
  payload: {
    id,
    patternPieceIndex,
    name,
  },
});

export const customProjectAddStep = (
  id: ProjectId,
  patternPieceIndex: number,
  shape: Shape,
) => ({
  type: CustomProjectActions.addStep,
  payload: {
    id,
    patternPieceIndex,
    shape,
  },
});

export const customProjectUpdateStepName = (
  id: ProjectId,
  patternPieceIndex: number,
  stepIndex: number,
  name: string,
) => ({
  type: CustomProjectActions.updateStepName,
  payload: {
    id,
    patternPieceIndex,
    stepIndex,
    name,
  },
});

export const customProjectUpdateStepShape = (
  id: ProjectId,
  patternPieceIndex: number,
  stepIndex: number,
  shape: Shape,
) => ({
  type: CustomProjectActions.updateStepShape,
  payload: {
    id,
    patternPieceIndex,
    stepIndex,
    shape,
  },
});

export const customProjectUpdateStepMeasurement = (
  id: ProjectId,
  patternPieceIndex: number,
  stepIndex: number,
  name: string,
  value: number | undefined,
) => ({
  type: CustomProjectActions.updateStepMeasurement,
  payload: {
    id,
    patternPieceIndex,
    stepIndex,
    name,
    value,
  },
});
