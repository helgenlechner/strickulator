import { useSelector } from 'react-redux';
import { Selector } from 'redux-views';
import {
  getHeightOfOneRow,
  getWidthOfOneStitch,
} from '../patterns/p1295/selectors/p1295.swatch.selectors';
import { AppState } from '../store/store.model';

const resizeFactor = 6;

export const useWidth = (selector: Selector<AppState, number | undefined>) => {
  const widthOfOneStitch = useSelector(getWidthOfOneStitch);
  const numberOfStitches = useSelector(selector);

  if (!numberOfStitches || !widthOfOneStitch) {
    return 0;
  }

  return numberOfStitches * widthOfOneStitch * resizeFactor;
};

export const useHeight = (selector: Selector<AppState, number | undefined>) => {
  const heightOfOneRow = useSelector(getHeightOfOneRow);
  const numberOfRows = useSelector(selector);

  if (!numberOfRows || !heightOfOneRow) {
    return 0;
  }

  return numberOfRows * heightOfOneRow * resizeFactor;
};
