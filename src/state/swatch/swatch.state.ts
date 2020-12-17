import { atom } from 'recoil';

export interface SwatchState {
  numberOfStitches?: number;
  numberOfRows?: number;
  width?: number;
  height?: number;
}

export const swatchState = atom<SwatchState>({
  key: 'swatchState',
  default: {},
});
