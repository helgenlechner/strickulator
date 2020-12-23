type BaseSlope = {
  delta: number;
  type: 'increasing' | 'decreasing';
  numberOfRows: number;
};

type EvenSlope = BaseSlope & {
  rowInterval: number;
  stitchDelta: number;
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
      rowInterval: 2,
      stitchDelta: 1,
      delta: numberOfRows / 2,
      type,
      numberOfRows,
    };
  }

  if (singleRowSlope === 1) {
    return {
      rowInterval: 1,
      stitchDelta: 1,
      delta: numberOfRows,
      type,
      numberOfRows,
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
    numberOfRows,
  };
};
