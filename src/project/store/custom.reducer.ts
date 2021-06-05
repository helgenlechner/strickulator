import { Draft } from 'immer';
import { Action } from 'redux';
import { KnittingStyle, ProjectStore } from '../../store/project/project.model';
import { CustomMeasurements } from './custom.model';
import {
  CustomProjectActions,
  customProjectAddPatternPiece,
  customProjectAddStep,
  customProjectUpdatePatternPieceName,
  customProjectUpdateStepKnittingStyle,
  customProjectUpdateStepMeasurement,
  customProjectUpdateStepName,
  customProjectUpdateStepShape,
} from './custom.actions';

export const CustomProjectReducer = (
  draft: Draft<ProjectStore>,
  action: Action,
) => {
  switch (action.type) {
    case CustomProjectActions.addPatternPiece: {
      const { payload } = action as ReturnType<
        typeof customProjectAddPatternPiece
      >;

      if (!draft[payload.id]?.measurements?.patternPieces) {
        draft[payload.id].measurements = {
          // @ts-ignore
          patternPieces: [],
        };
      }

      (
        draft[payload.id]?.measurements as CustomMeasurements | undefined
      )?.patternPieces?.push({
        name: '',
        steps: [],
      });

      return;
    }
    case CustomProjectActions.updatePatternPieceName: {
      const { payload } = action as ReturnType<
        typeof customProjectUpdatePatternPieceName
      >;

      const patternPiece = (
        draft[payload.id]?.measurements as CustomMeasurements | undefined
      )?.patternPieces?.[payload.patternPieceIndex];

      if (patternPiece) {
        patternPiece.name = payload.name;
      }

      return;
    }
    case CustomProjectActions.addStep: {
      const { payload } = action as ReturnType<typeof customProjectAddStep>;

      (
        draft[payload.id]?.measurements as CustomMeasurements | undefined
      )?.patternPieces?.[payload.patternPieceIndex]?.steps.push({
        name: '',
        shape: payload.shape,
        knittingStyle: KnittingStyle.flat,
      });

      return;
    }
    case CustomProjectActions.updateStepName: {
      const { payload } = action as ReturnType<
        typeof customProjectUpdateStepName
      >;

      const step = (
        draft[payload.id]?.measurements as CustomMeasurements | undefined
      )?.patternPieces?.[payload.patternPieceIndex]?.steps[payload.stepIndex];

      if (step) {
        step.name = payload.name;
      }

      return;
    }
    case CustomProjectActions.updateStepShape: {
      const { payload } = action as ReturnType<
        typeof customProjectUpdateStepShape
      >;

      const step = (
        draft[payload.id]?.measurements as CustomMeasurements | undefined
      )?.patternPieces?.[payload.patternPieceIndex]?.steps[payload.stepIndex];

      if (step) {
        step.shape = payload.shape;
      }

      return;
    }
    case CustomProjectActions.updateStepMeasurement: {
      const { payload } = action as ReturnType<
        typeof customProjectUpdateStepMeasurement
      >;

      const step = (
        draft[payload.id]?.measurements as CustomMeasurements | undefined
      )?.patternPieces?.[payload.patternPieceIndex]?.steps[payload.stepIndex];

      if (step) {
        // @ts-ignore
        step[payload.name] = payload.value;
      }

      return;
    }
    case CustomProjectActions.updateStepKnittingStyle: {
      const { payload } = action as ReturnType<
        typeof customProjectUpdateStepKnittingStyle
      >;

      const step = (
        draft[payload.id]?.measurements as CustomMeasurements | undefined
      )?.patternPieces?.[payload.patternPieceIndex]?.steps[payload.stepIndex];

      if (step) {
        step.knittingStyle = payload.knittingStyle;
      }

      return;
    }
  }
};
