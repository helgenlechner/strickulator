import { atom } from 'recoil';
import { localStorageEffect } from '../effects/localStorage.effect';

export interface SwatchState {
  numberOfStitches?: number;
  numberOfRows?: number;
  width?: number;
  height?: number;
}

export const swatchState = atom<SwatchState>({
  key: 'swatchState',
  default: {},
  effects_UNSTABLE: [localStorageEffect<SwatchState>('swatch')],
});
