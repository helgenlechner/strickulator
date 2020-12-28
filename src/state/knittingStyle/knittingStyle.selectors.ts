import { selector } from 'recoil';
import { knittingStyleState } from './knittingStyle.state';

export const getIsKnittedInTheRound = selector({
  key: 'getIsKnittedInTheRound',
  get: ({ get }) => get(knittingStyleState).flatOrRound === 'round',
});
