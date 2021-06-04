import {
  GaugeCalculator,
  KnittingStyle,
  Measurements,
  ProjectId,
  Swatch,
} from './project.model';
import { History } from 'history';

export enum ProjectActions {
  create = '@@project/CREATE',
  updateLabel = '@@project/UPDATE_LABEL',
  updateSwatch = '@@project/UPDATE_SWATCH',
  updateMeasurements = '@@project/UPDATE_MEASUREMENTS',
  updateKnittingStyle = '@@project/UPDATE_KNITTING_STYLE',
  updateGaugeCalculator = '@@project/UPDATE_GAUGE_CALCULATOR',
  updateNotes = '@@project/UPDATE_NOTES',
  delete = '@@project/DELETE',
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

export const projectUpdateMeasurements = (
  id: ProjectId,
  measurements: Measurements,
) => ({
  type: ProjectActions.updateMeasurements,
  payload: {
    id,
    measurements,
  },
});

export const projectUpdateKnittingStyle = (
  id: ProjectId,
  knittingStyle: KnittingStyle,
) => ({
  type: ProjectActions.updateKnittingStyle,
  payload: {
    id,
    knittingStyle,
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
