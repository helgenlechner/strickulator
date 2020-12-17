import { atom } from 'recoil';

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
});
