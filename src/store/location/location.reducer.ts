import produce, { Draft } from 'immer';
import { Reducer } from 'redux';
import { LocationActions, locationSetActiveStepId } from './location.actions';
import { LocationStore } from './location.model';

const initialState: LocationStore = { menuIsVisible: true };

export const LocationReducer: Reducer<LocationStore> = produce(
  (draft: Draft<LocationStore>, action) => {
    switch (action.type) {
      case LocationActions.SetActiveStepId:
        const { payload } = action as ReturnType<
          typeof locationSetActiveStepId
        >;

        draft.activeStep = payload.activeStepId;
        return;
      case LocationActions.ToggleMenuVisibility:
        draft.menuIsVisible = !draft.menuIsVisible;
        return;
      default:
        return draft;
    }
  },
  initialState,
);
