import produce, { Draft } from 'immer';
import { Reducer } from 'redux';
import { CustomProjectReducer } from '../../patterns/custom/store/custom.reducer';
import {
  ProjectActions,
  projectCreate,
  projectDelete,
  projectUpdateGaugeCalculator,
  projectUpdateKnittingStyle,
  projectUpdateLabel,
  projectUpdateMeasurements,
  projectUpdateNotes,
  projectUpdateSwatch,
} from './project.actions';
import {
  GaugeCalculator,
  KnittingStyle,
  ProjectStore,
  Swatch,
} from './project.model';

export const initialState: ProjectStore = {};

export const ProjectReducer: Reducer<ProjectStore> = produce(
  (draft: Draft<ProjectStore>, action) => {
    switch (action.type) {
      case ProjectActions.create: {
        const { payload } = action as ReturnType<typeof projectCreate>;

        const projectId = Object.keys(draft).length.toString();

        const copySource = payload.copySource
          ? draft[payload.copySource]
          : undefined;

        draft[projectId] = {
          id: projectId,
          patternId: payload.patternId,
          label: 'New Project',
          swatch:
            (copySource?.swatch &&
              JSON.parse(JSON.stringify(copySource.swatch))) ??
            {},
          measurements:
            (copySource?.measurements &&
              JSON.parse(JSON.stringify(copySource.measurements))) ??
            {},
          knittingStyle: copySource?.knittingStyle ?? KnittingStyle.flat,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        return;
      }
      case ProjectActions.updateLabel: {
        const { payload } = action as ReturnType<typeof projectUpdateLabel>;

        if (!draft[payload.id]) {
          return;
        }

        draft[payload.id].label = payload.label;
        draft[payload.id].updatedAt = Date.now();

        return;
      }
      case ProjectActions.updateSwatch: {
        const { payload } = action as ReturnType<typeof projectUpdateSwatch>;

        if (!draft[payload.id]) {
          return;
        }

        Object.keys(payload.swatch).forEach((key) => {
          draft[payload.id].swatch[key as keyof Swatch] =
            payload.swatch[key as keyof Swatch];
        });

        draft[payload.id].updatedAt = Date.now();

        return;
      }
      case ProjectActions.updateMeasurements: {
        const { payload } = action as ReturnType<
          typeof projectUpdateMeasurements
        >;

        if (!draft[payload.id]) {
          return;
        }

        Object.keys(payload.measurements).forEach((key) => {
          draft[payload.id].measurements[key] = payload.measurements[key];
        });

        draft[payload.id].updatedAt = Date.now();

        return;
      }
      case ProjectActions.updateKnittingStyle: {
        const { payload } = action as ReturnType<
          typeof projectUpdateKnittingStyle
        >;

        if (!draft[payload.id]) {
          return;
        }

        draft[payload.id].knittingStyle = payload.knittingStyle;
        draft[payload.id].updatedAt = Date.now();

        return;
      }
      case ProjectActions.updateGaugeCalculator: {
        const { payload } = action as ReturnType<
          typeof projectUpdateGaugeCalculator
        >;

        if (!draft[payload.id]) {
          return;
        }

        if (!draft[payload.id].gauge) {
          draft[payload.id].gauge = {};
        }

        Object.keys(payload.gauge).forEach((key) => {
          const { gauge } = draft[payload.id];

          if (gauge) {
            const keyAsIndexType = key as keyof GaugeCalculator;
            gauge[keyAsIndexType] = payload.gauge[keyAsIndexType];
          }
        });

        return;
      }
      case ProjectActions.delete: {
        const { payload } = action as ReturnType<typeof projectDelete>;

        delete draft[payload.id];

        return;
      }
      case ProjectActions.updateNotes: {
        const { payload } = action as ReturnType<typeof projectUpdateNotes>;

        if (!draft[payload.id]) {
          return;
        }

        draft[payload.id].notes = payload.notes;

        return;
      }
    }

    CustomProjectReducer(draft, action);
  },
  initialState,
);
