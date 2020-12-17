import { atom } from 'recoil';
import { localStorageEffect } from '../effects/localStorage.effect';

export interface BackState {
  hemWidth?: number;
  hemHeight?: number;
  widthBelowArmhole?: number;
  widthOfDecForArmhole?: number;
  bodiceHeightUntilArmhole?: number;
  bottomArmholeHeight?: number;
  widthBetweenArmholes?: number;
  heightBetweenArmholes?: number;
  heightAtShoulders?: number;
  neckWidth?: number;
}

export const backState = atom<BackState>({
  key: 'backState',
  default: {},
  effects_UNSTABLE: [localStorageEffect<BackState>('back')],
});
