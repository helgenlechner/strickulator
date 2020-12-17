import { selector } from 'recoil';
import { swatchState } from './swatch.state';

export const getWidthOfOneStitch = selector({
  key: 'widthOfOneStitch',
  get: ({ get }) => {
    const swatch = get(swatchState);

    if (
      swatch.width === undefined ||
      swatch.numberOfStitches === undefined ||
      swatch.numberOfStitches === 0
    ) {
      return undefined;
    }

    return swatch.width / swatch.numberOfStitches;
  },
});

export const getHeightOfOneRow = selector({
  key: 'heightOfOneRow',
  get: ({ get }) => {
    const swatch = get(swatchState);

    if (
      swatch.height === undefined ||
      swatch.numberOfRows === undefined ||
      swatch.numberOfRows === 0
    ) {
      return undefined;
    }

    return swatch.height / swatch.numberOfRows;
  },
});
