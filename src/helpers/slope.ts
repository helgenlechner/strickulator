type BaseSlope = {
  delta: number;
  type: 'increasing' | 'decreasing';
};

type EvenSlope = BaseSlope & {
  numberOfRows: number;
  numberOfStitches: number;
};

type UnevenSlope = BaseSlope & {
  pattern: { [row: number]: number };
};

export type Slope = EvenSlope | UnevenSlope;

export const calculateSlope = (
  firstNumberOfStitches: number | undefined,
  secondNumberOfStitches: number | undefined,
  numberOfRows: number | undefined,
): Slope | undefined => {
  if (
    firstNumberOfStitches === undefined ||
    secondNumberOfStitches === undefined ||
    !numberOfRows
  ) {
    return undefined;
  }
  const wideNumberOfStitches = Math.max(
    firstNumberOfStitches,
    secondNumberOfStitches,
  );
  const narrowNumberOfStitches = Math.min(
    firstNumberOfStitches,
    secondNumberOfStitches,
  );

  const type =
    firstNumberOfStitches === wideNumberOfStitches
      ? 'decreasing'
      : 'increasing';

  const stitchDelta = wideNumberOfStitches - narrowNumberOfStitches;

  const singleRowSlope = stitchDelta / numberOfRows;
  const doubleRowSlope = stitchDelta / (numberOfRows / 2);

  if (doubleRowSlope === 1) {
    return {
      numberOfRows: 2,
      numberOfStitches: 1,
      delta: numberOfRows / 2,
      type,
    };
  }

  if (singleRowSlope === 1) {
    return {
      numberOfRows: 1,
      numberOfStitches: 1,
      delta: numberOfRows,
      type,
    };
  }

  const pattern: UnevenSlope['pattern'] = {};

  for (let i = 0; i <= numberOfRows; i++) {
    const current = Math.round(i * singleRowSlope);
    const previous = i === 0 ? 0 : Math.round((i - 1) * singleRowSlope);

    if (current - previous !== 0) {
      pattern[i] = current - previous;
    }
  }

  return {
    pattern,
    delta: Object.values(pattern).reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0,
    ),
    type,
  };
};
