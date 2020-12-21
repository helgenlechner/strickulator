import { atom } from 'recoil';
import { localStorageEffect } from '../effects/localStorage.effect';

export interface BackState {
  widthBetweenArmholes?: number;
  heightAtShoulders?: number;
  neckWidth?: number;
}

export const backState = atom<BackState>({
  key: 'backState',
  default: {},
  effects_UNSTABLE: [localStorageEffect<BackState>('back')],
});
