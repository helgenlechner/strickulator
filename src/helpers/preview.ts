import { RecoilValue, useRecoilValue } from 'recoil';
import {
  getHeightOfOneRow,
  getWidthOfOneStitch,
} from '../state/swatch/swatch.selectors';

const resizeFactor = 6;

export const useWidth = (selector: RecoilValue<number | undefined>) => {
  const widthOfOneStitch = useRecoilValue(getWidthOfOneStitch);
  const numberOfStitches = useRecoilValue(selector);

  if (!numberOfStitches || !widthOfOneStitch) {
    return 0;
  }

  return numberOfStitches * widthOfOneStitch * resizeFactor;
};

export const useHeight = (selector: RecoilValue<number | undefined>) => {
  const heightOfOneRow = useRecoilValue(getHeightOfOneRow);
  const numberOfRows = useRecoilValue(selector);

  if (!numberOfRows || !heightOfOneRow) {
    return 0;
  }

  return numberOfRows * heightOfOneRow * resizeFactor;
};
