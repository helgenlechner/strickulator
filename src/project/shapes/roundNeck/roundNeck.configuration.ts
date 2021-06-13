import {
  Shape,
  ShapeConfiguration,
} from '../../../store/project/project.model';
import { isRoundNeck } from './roundNeck.model';
import {
  getNumberOfBottomStitches,
  getNumberOfRows,
  getNumberOfTopStitches,
} from './roundNeck.selectors';
import { RoundNeckInput } from './RoundNeckInput';
import { RoundNeckPreview } from './RoundNeckPreview';

export const roundNeck: ShapeConfiguration = {
  name: Shape.RoundNeck,
  label: 'Round Neck Opening',
  Input: RoundNeckInput,
  Preview: RoundNeckPreview,
  getWidestMeasurement: (shape) =>
    isRoundNeck(shape) ? shape.bottomWidth : undefined,
  getNumberOfStiches: (shape, widthOfOneStitch, heightOfOneRow) => {
    if (!isRoundNeck(shape)) {
      return 0;
    }

    const bottomNumberOfStiches = getNumberOfBottomStitches.resultFunc(
      shape.bottomWidth,
      widthOfOneStitch,
    );
    const topNumberOfStiches = getNumberOfTopStitches.resultFunc(
      shape.topWidth,
      widthOfOneStitch,
    );
    const numberOfRows = getNumberOfRows.resultFunc(
      shape.height,
      heightOfOneRow,
    );

    if (!bottomNumberOfStiches || !topNumberOfStiches || !numberOfRows) {
      return 0;
    }

    const rectangleStitches = bottomNumberOfStiches * numberOfRows;
    const ellipseStitches =
      Math.PI * bottomNumberOfStiches * topNumberOfStiches;

    return (rectangleStitches - ellipseStitches / 4) * 2;
  },
};
