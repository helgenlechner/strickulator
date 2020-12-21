import { atom } from 'recoil';
import { localStorageEffect } from '../effects/localStorage.effect';

export interface FrontState {
  widthBetweenArmholes?: number;
  heightAtShoulders?: number;
  neckWidth?: number;
  necklineDepth?: number;
}

export const frontState = atom<FrontState>({
  key: 'frontState',
  default: {},
  effects_UNSTABLE: [localStorageEffect<FrontState>('front')],
});
