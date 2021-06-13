import { GaugeCalculator, ProjectId, Swatch } from './project.model';
import { History } from 'history';

export enum ProjectActions {
  create = '@@project/CREATE',
  updateLabel = '@@project/UPDATE_LABEL',
  updateSwatch = '@@project/UPDATE_SWATCH',
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
