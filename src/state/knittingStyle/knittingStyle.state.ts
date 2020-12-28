import { atom } from 'recoil';
import { localStorageEffect } from '../effects/localStorage.effect';

export interface KnittingStyleState {
  flatOrRound: 'flat' | 'round';
}

export const knittingStyleState = atom<KnittingStyleState>({
  key: 'knittingStyleState',
  default: { flatOrRound: 'flat' },
  effects_UNSTABLE: [localStorageEffect('style')],
});
