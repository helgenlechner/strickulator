import { atom } from 'recoil';
import { localStorageEffect } from '../effects/localStorage.effect';

export interface SleeveState {
  wristWidth?: number;
  hemHeight?: number;
  underarmWidth?: number;
  underarmToWrist?: number;
  underarmToSleeveHead?: number;
}

export const sleeveState = atom<SleeveState>({
  key: 'sleeveState',
  default: {},
  effects_UNSTABLE: [localStorageEffect<SleeveState>('sleeve')],
});
