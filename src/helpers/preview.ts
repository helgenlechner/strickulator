const resizeFactor = 6;

export const getWidth = (
  numberOfStitches: number | undefined,
  widthOfOneStitch: number | undefined,
) => {
  if (!numberOfStitches || !widthOfOneStitch) {
    return 0;
  }

  return numberOfStitches * widthOfOneStitch * resizeFactor;
};

export const getHeight = (
  numberOfRows: number | undefined,
  heightOfOneRow: number | undefined,
) => {
  if (!numberOfRows || !heightOfOneRow) {
    return 0;
  }

  return numberOfRows * heightOfOneRow * resizeFactor;
};
