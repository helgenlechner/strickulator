export const calculateSlope = (
  wideNumberOfStitches: number | undefined,
  narrowNumberOfStitches: number | undefined,
  numberOfRows: number | undefined,
) => {
  if (!wideNumberOfStitches || !narrowNumberOfStitches || !numberOfRows) {
    return undefined;
  }

  const numberOfStitchesToAdd = wideNumberOfStitches - narrowNumberOfStitches;

  if (numberOfStitchesToAdd >= numberOfRows) {
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

  while (numberOfRowsBetweenIncreases * numberOfIncreaseRows > numberOfRows) {
    numberOfRowsBetweenIncreases--;
  }

  return {
    numberOfRows: numberOfRowsBetweenIncreases,
    numberOfStitches: 1,
  };
};
