export type Slope = {
  delta: number;
  type: '+' | '-';
  numberOfRows: number;
  pattern: { [row: number]: number };
  rowInterval?: number;
  stitchDelta?: number;
};

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

  const type: Slope['type'] =
    firstNumberOfStitches === wideNumberOfStitches ? '-' : '+';

  const stitchDelta = wideNumberOfStitches - narrowNumberOfStitches;

  const singleRowSlope = stitchDelta / numberOfRows;

  const pattern: Slope['pattern'] = {};

  for (let i = 0; i <= numberOfRows; i += 2) {
    const current = Math.round(i * singleRowSlope);
    const previous = i === 0 ? 0 : Math.round((i - 2) * singleRowSlope);

    if (current - previous !== 0) {
      pattern[i] = current - previous;
    }
  }

  const rawSlope: Slope = {
    pattern,
    delta: Object.values(pattern).reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0,
    ),
    type,
    numberOfRows,
  };

  rawSlope.stitchDelta = Object.values(pattern).reduce<number | undefined>(
    (status, current, index) => {
      if (index === 0) {
        return current;
      }

      if (current === status) {
        return status;
      }

      return undefined;
    },
    undefined,
  );

  if (rawSlope.stitchDelta) {
    rawSlope.rowInterval = Object.keys(pattern).reduce<number | undefined>(
      (status, current, index, array) => {
        if (index === 0) {
          return parseInt(current);
        }

        if (!status) {
          return undefined;
        }

        if (status === parseInt(current) - parseInt(array[index - 1])) {
          return status;
        }

        return undefined;
      },
      undefined,
    );
  }

  return rawSlope;
};
