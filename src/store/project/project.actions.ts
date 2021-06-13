import {
  GaugeCalculator,
  KnittingStyle,
  ProjectId,
  Shape,
  Swatch,
} from './project.model';
import { History } from 'history';

export enum ProjectActions {
  create = '@@project/CREATE',
  updateLabel = '@@project/UPDATE_LABEL',
  updateSwatch = '@@project/UPDATE_SWATCH',
  updateGaugeCalculator = '@@project/UPDATE_GAUGE_CALCULATOR',
  updateNotes = '@@project/UPDATE_NOTES',
  delete = '@@project/DELETE',
  addPatternPiece = '@@project/ADD_PATTERN_PIECE',
  updatePatternPieceName = '@@project/UPDATE_PATTERN_PIECE_NAME',
  addStep = '@@project/ADD_STEP',
  updateStepName = '@@project/UPDATE_STEP_NAME',
  updateStepShape = '@@project/UPDATE_STEP_SHAPE',
  updateStepMeasurement = '@@project/UPDATE_STEP_MEASUREMENT',
  updateStepKnittingStyle = '@@project/UPDATE_STEP_KNITTING_STYLE',
}

export const projectCreate = (history: History, copySource?: ProjectId) => ({
  type: ProjectActions.create,
  payload: {
    history,
    copySource,
  },
});

export const projectUpdateLabel = (id: ProjectId, label: string) => ({
  type: ProjectActions.updateLabel,
  payload: {
    id,
    label,
  },
});

export const projectUpdateSwatch = (id: ProjectId, swatch: Swatch) => ({
  type: ProjectActions.updateSwatch,
  payload: {
    id,
    swatch,
  },
});

export const projectUpdateGaugeCalculator = (
  id: ProjectId,
  gauge: Partial<GaugeCalculator>,
) => ({
  type: ProjectActions.updateGaugeCalculator,
  payload: {
    id,
    gauge,
  },
});

export const projectUpdateNotes = (id: ProjectId, notes: string) => ({
  type: ProjectActions.updateNotes,
  payload: {
    id,
    notes,
  },
});

export const projectDelete = (id: ProjectId) => ({
  type: ProjectActions.delete,
  payload: {
    id,
  },
});

export const projectAddPatternPiece = (id: ProjectId) => ({
  type: ProjectActions.addPatternPiece,
  payload: { id },
});

export const projectUpdatePatternPieceName = (
  id: ProjectId,
  patternPieceIndex: number,
  name: string,
) => ({
  type: ProjectActions.updatePatternPieceName,
  payload: {
    id,
    patternPieceIndex,
    name,
  },
});

export const projectAddStep = (
  id: ProjectId,
  patternPieceIndex: number,
  shape: Shape,
) => ({
  type: ProjectActions.addStep,
  payload: {
    id,
    patternPieceIndex,
    shape,
  },
});

export const projectUpdateStepName = (
  id: ProjectId,
  patternPieceIndex: number,
  stepIndex: number,
  name: string,
) => ({
  type: ProjectActions.updateStepName,
  payload: {
    id,
    patternPieceIndex,
    stepIndex,
    name,
  },
});

export const projectUpdateStepShape = (
  id: ProjectId,
  patternPieceIndex: number,
  stepIndex: number,
  shape: Shape,
) => ({
  type: ProjectActions.updateStepShape,
  payload: {
    id,
    patternPieceIndex,
    stepIndex,
    shape,
  },
});

export const projectUpdateStepMeasurement = (
  id: ProjectId,
  patternPieceIndex: number,
  stepIndex: number,
  name: string,
  value: number | undefined,
) => ({
  type: ProjectActions.updateStepMeasurement,
  payload: {
    id,
    patternPieceIndex,
    stepIndex,
    name,
    value,
  },
});

export const projectUpdateStepKnittingStyle = (
  id: ProjectId,
  patternPieceIndex: number,
  stepIndex: number,
  knittingStyle: KnittingStyle,
) => ({
  type: ProjectActions.updateStepKnittingStyle,
  payload: {
    id,
    patternPieceIndex,
    stepIndex,
    knittingStyle,
  },
});
