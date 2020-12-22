import { atom } from 'recoil';

export interface LocationState {
  activeStep?: string;
}

export const locationState = atom<LocationState>({
  key: 'locationState',
  default: {},
});
