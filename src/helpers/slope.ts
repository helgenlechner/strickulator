export const calculateSlope = (
  wideMeasurement: number | undefined,
  narrowMeasurement: number | undefined,
  numberOfRows: number | undefined,
) => {
  if (!wideMeasurement || !narrowMeasurement || !numberOfRows) {
    return undefined;
  }

  const numberOfStitchesToAdd = wideMeasurement - narrowMeasurement;

  if (numberOfStitchesToAdd >= numberOfRows) {
    // steep slope

    const numberOfStitchesToAddEveryTime = Math.ceil(
      numberOfStitchesToAdd / (numberOfRows / 2),
    );

    const totalStitchesThatWouldBeIncreased =
      numberOfStitchesToAddEveryTime * (numberOfRows / 2);

    return {
      numberOfRows: 2,
      numberOfStitches: numberOfStitchesToAddEveryTime,
      excess: totalStitchesThatWouldBeIncreased - numberOfStitchesToAdd,
    };
  }

  // shallow slope

  const numberOfIncreaseRows = numberOfStitchesToAdd / 2;

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
    numberOfStitches: 2,
  };
};
