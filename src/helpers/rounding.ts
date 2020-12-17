const isEven = (input: number) => input % 2 === 0;

export const roundToEvenNumber = (input: number) => {
  if (isEven(input)) {
    return input;
  }

  const roundedDown = Math.floor(input);

  if (input % 2 < 1) {
    if (isEven(roundedDown)) {
      return roundedDown;
    }

    return roundedDown - 1;
  }

  return roundedDown + 1;
};
