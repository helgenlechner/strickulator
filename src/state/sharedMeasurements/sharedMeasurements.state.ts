import { atom } from 'recoil';
import { localStorageEffect } from '../effects/localStorage.effect';

export interface SharedMeasurementsState {
  hemWidth?: number;
  hemHeight?: number;
  widthBelowArmhole?: number;
  widthOfDecForArmhole?: number;
  bodiceHeightUntilArmhole?: number;
  bottomArmholeHeight?: number;
  heightBetweenArmholes?: number;
}

export const sharedMeasurementsState = atom<SharedMeasurementsState>({
  key: 'sharedMeasurementsState',
  default: {},
  effects_UNSTABLE: [localStorageEffect<SharedMeasurementsState>('shared')],
});
