import produce, { Draft } from 'immer';
import { Reducer } from 'redux';
import {
  ProjectActions,
  projectCreate,
  projectUpdateKnittingStyle,
  projectUpdateLabel,
  projectUpdateMeasurements,
  projectUpdateSwatch,
} from './project.actions';
import { KnittingStyle, ProjectStore, Swatch } from './project.model';

const initialState: ProjectStore = {
  '0': {
    id: '0',
    label: 'New Project',
    patternId: 'p1295',
    swatch: {},
    measurements: {},
    knittingStyle: KnittingStyle.flat,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
};

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
    }
  },
  initialState,
);
