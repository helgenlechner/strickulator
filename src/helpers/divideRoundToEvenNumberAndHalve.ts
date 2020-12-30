import { roundToEvenNumber } from './rounding';

export const divideRoundToEvenNumberAndHalve = (
  dividend: number | undefined,
  divisor: number | undefined,
) => {
  if (!dividend || !divisor) {
    return undefined;
  }

  return roundToEvenNumber(dividend / divisor) / 2;
};
