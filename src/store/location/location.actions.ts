export enum LocationActions {
  SetActiveStepId = '@@location/SET_ACTIVE_STEP_ID',
  ToggleMenuVisibility = '@@location/TOGGLE_MENU_VISIBILITY',
}

export const locationSetActiveStepId = (activeStepId: string | undefined) => ({
  type: LocationActions.SetActiveStepId,
  payload: {
    activeStepId,
  },
});

export const locationToggleMenuVisibility = () => ({
  type: LocationActions.ToggleMenuVisibility,
});
