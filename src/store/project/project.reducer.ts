import produce, { Draft } from 'immer';
import { Reducer } from 'redux';
import {
  ProjectActions,
  projectAddPatternPiece,
  projectAddStep,
  projectCreate,
  projectDelete,
  projectDeleteStep,
  projectMoveStepDown,
  projectMoveStepUp,
  projectUpdateGaugeCalculator,
  projectUpdateLabel,
  projectUpdateNotes,
  projectUpdatePatternPieceName,
  projectUpdateStepKnittingStyle,
  projectUpdateStepMeasurement,
  projectUpdateStepName,
  projectUpdateStepShape,
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

        const projectId = (
          Object.keys(draft).reduce(
            (final, current) => Math.max(final, Number(current)),
            0,
          ) + 1
        ).toString(10);

        const copySource = payload.copySource
          ? draft[payload.copySource]
          : undefined;

        draft[projectId] = {
          id: projectId,
          label: 'New Project',
          swatches:
            (copySource?.swatches &&
              JSON.parse(JSON.stringify(copySource.swatches))) ??
            {},
          patternPieces:
            (copySource?.patternPieces &&
              JSON.parse(JSON.stringify(copySource.patternPieces))) ??
            [],
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
          draft[payload.id].swatches[0][key as keyof Swatch] =
            payload.swatch[key as keyof Swatch];
        });

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
      case ProjectActions.addPatternPiece: {
        const { payload } = action as ReturnType<typeof projectAddPatternPiece>;

        if (!draft[payload.id]?.patternPieces) {
          draft[payload.id].patternPieces = [];
        }

        draft[payload.id]?.patternPieces?.push({
          name: '',
          steps: [],
        });

        return;
      }
      case ProjectActions.updatePatternPieceName: {
        const { payload } = action as ReturnType<
          typeof projectUpdatePatternPieceName
        >;

        const patternPiece =
          draft[payload.id]?.patternPieces?.[payload.patternPieceIndex];

        if (patternPiece) {
          patternPiece.name = payload.name;
        }

        return;
      }
      case ProjectActions.addStep: {
        const { payload } = action as ReturnType<typeof projectAddStep>;

        draft[payload.id]?.patternPieces?.[
          payload.patternPieceIndex
        ]?.steps.push({
          name: '',
          shape: payload.shape,
          knittingStyle: KnittingStyle.flat,
        });

        return;
      }
      case ProjectActions.updateStepName: {
        const { payload } = action as ReturnType<typeof projectUpdateStepName>;

        const step =
          draft[payload.id]?.patternPieces?.[payload.patternPieceIndex]?.steps[
            payload.stepIndex
          ];

        if (step) {
          step.name = payload.name;
        }

        return;
      }
      case ProjectActions.updateStepShape: {
        const { payload } = action as ReturnType<typeof projectUpdateStepShape>;

        const step =
          draft[payload.id]?.patternPieces?.[payload.patternPieceIndex]?.steps[
            payload.stepIndex
          ];

        if (step) {
          step.shape = payload.shape;
        }

        return;
      }
      case ProjectActions.updateStepMeasurement: {
        const { payload } = action as ReturnType<
          typeof projectUpdateStepMeasurement
        >;

        const step =
          draft[payload.id]?.patternPieces?.[payload.patternPieceIndex]?.steps[
            payload.stepIndex
          ];

        if (step) {
          // @ts-ignore
          step[payload.name] = payload.value;
        }

        return;
      }
      case ProjectActions.updateStepKnittingStyle: {
        const { payload } = action as ReturnType<
          typeof projectUpdateStepKnittingStyle
        >;

        const step =
          draft[payload.id]?.patternPieces?.[payload.patternPieceIndex]?.steps[
            payload.stepIndex
          ];

        if (step) {
          step.knittingStyle = payload.knittingStyle;
        }

        return;
      }
      case ProjectActions.deleteStep: {
        const { payload } = action as ReturnType<typeof projectDeleteStep>;

        draft[payload.id]?.patternPieces?.[
          payload.patternPieceIndex
        ]?.steps.splice(payload.stepIndex, 1);

        return;
      }
      case ProjectActions.moveStepUp: {
        const { payload } = action as ReturnType<typeof projectMoveStepUp>;

        if (
          payload.stepIndex === 0 ||
          !draft[payload.id]?.patternPieces?.[payload.patternPieceIndex]?.steps
        ) {
          return;
        }

        draft[payload.id].patternPieces[payload.patternPieceIndex].steps.splice(
          payload.stepIndex - 1,
          0,
          draft[payload.id].patternPieces[
            payload.patternPieceIndex
          ].steps.splice(payload.stepIndex, 1)[0],
        );

        return;
      }
      case ProjectActions.moveStepDown: {
        const { payload } = action as ReturnType<typeof projectMoveStepDown>;

        if (
          !draft[payload.id]?.patternPieces?.[payload.patternPieceIndex]
            ?.steps ||
          payload.stepIndex ===
            draft[payload.id]?.patternPieces?.[payload.patternPieceIndex]?.steps
              .length -
              1
        ) {
          return;
        }

        draft[payload.id].patternPieces[payload.patternPieceIndex].steps.splice(
          payload.stepIndex + 1,
          0,
          draft[payload.id].patternPieces[
            payload.patternPieceIndex
          ].steps.splice(payload.stepIndex, 1)[0],
        );

        return;
      }
    }
  },
  initialState,
);
