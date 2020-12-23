import { selector } from 'recoil';
import { locationState } from './location.state';

export const getActiveStepId = selector({
  key: 'getActiveStepId',
  get: ({ get }) => {
    const location = get(locationState);

    return location.activeStep;
  },
});
