import { useSelector } from 'react-redux';
import { ParametricSelector } from 'redux-views';
import {
  getHeightOfOneRow,
  getWidthOfOneStitch,
} from '../store/project/project.swatch.selectors';
import { ProjectId } from '../store/project/project.model';
import { AppState } from '../store/store.model';
import { useParams } from 'react-router-dom';

const resizeFactor = 6;

type Selector = ParametricSelector<
  AppState,
  { projectId: ProjectId },
  number | undefined
>;

export const useWidth = (selector: Selector) => {
  const { projectId } = useParams<{ projectId: ProjectId }>();

  const widthOfOneStitch = useSelector((state: AppState) =>
    getWidthOfOneStitch(state, { projectId }),
  );
  const numberOfStitches = useSelector((state: AppState) =>
    selector(state, { projectId }),
  );

  if (!numberOfStitches || !widthOfOneStitch) {
    return 0;
  }

  return numberOfStitches * widthOfOneStitch * resizeFactor;
};

export const useHeight = (selector: Selector) => {
  const { projectId } = useParams<{ projectId: ProjectId }>();

  const heightOfOneRow = useSelector((state: AppState) =>
    getHeightOfOneRow(state, { projectId }),
  );
  const numberOfRows = useSelector((state: AppState) =>
    selector(state, { projectId }),
  );

  if (!numberOfRows || !heightOfOneRow) {
    return 0;
  }

  return numberOfRows * heightOfOneRow * resizeFactor;
};
