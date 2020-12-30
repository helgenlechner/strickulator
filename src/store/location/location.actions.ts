export enum LocationActions {
  SetActiveStepId = '@@location/SET_ACTIVE_STEP_ID',
}

export const locationSetActiveStepId = (activeStepId: string | undefined) => ({
  type: LocationActions.SetActiveStepId,
  payload: {
    activeStepId,
  },
});
