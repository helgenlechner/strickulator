import produce, { Draft } from 'immer';
import { Reducer } from 'redux';
import { LocationActions, locationSetActiveStepId } from './location.actions';
import { LocationStore } from './location.model';

export const LocationReducer: Reducer<LocationStore> = produce(
  (draft: Draft<LocationStore>, action) => {
    switch (action.type) {
      case LocationActions.SetActiveStepId:
        const { payload } = action as ReturnType<
          typeof locationSetActiveStepId
        >;

        draft.activeStep = payload.activeStepId;
        return;
      default:
        return draft;
    }
  },
  {},
);
