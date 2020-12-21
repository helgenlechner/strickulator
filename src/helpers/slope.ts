export const calculateSlope = (
  firstNumberOfStitches: number | undefined,
  secondNumberOfStitches: number | undefined,
  numberOfRows: number | undefined,
) => {
  if (!firstNumberOfStitches || !secondNumberOfStitches || !numberOfRows) {
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

  const numberOfStitchesToAdd = wideNumberOfStitches - narrowNumberOfStitches;

  if (numberOfStitchesToAdd >= numberOfRows / 2) {
    // steep slope

    const numberOfStitchesToAddEveryTime = Math.ceil(
      numberOfStitchesToAdd / (numberOfRows / 2),
    );

    const totalStitchesThatWouldBeIncreased =
      numberOfStitchesToAddEveryTime * (numberOfRows / 2);

    const excessStitchesThatWouldBeIncreased =
      totalStitchesThatWouldBeIncreased - numberOfStitchesToAdd;

    return {
      numberOfRows: 2,
      numberOfStitches: numberOfStitchesToAddEveryTime,
      ...(excessStitchesThatWouldBeIncreased !== 0 && {
        excess: excessStitchesThatWouldBeIncreased,
      }),
    };
  }

  // shallow slope

  const numberOfIncreaseRows = numberOfStitchesToAdd;

  if (numberOfIncreaseRows === 0) {
    return { numberOfRows, numberOfStitches: 0 };
  }

  let numberOfRowsBetweenIncreases = Math.floor(
    (numberOfRows - 1) / numberOfIncreaseRows,
  );

  let iterations = 0;

  while (
    numberOfRowsBetweenIncreases * numberOfIncreaseRows > numberOfRows ||
    iterations >= 100
  ) {
    numberOfRowsBetweenIncreases--;
    iterations++;
  }

  return {
    numberOfRows: numberOfRowsBetweenIncreases,
    numberOfStitches: 1,
  };
};
