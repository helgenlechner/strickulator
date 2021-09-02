import {
  Shape,
  ShapeConfiguration,
} from '../../../store/project/project.model';
import { isBottomArmscye } from './bottomArmscye.model';
import {
  getNumberOfBottomStitches,
  getNumberOfRows,
  getNumberOfTopStitches,
} from './bottomArmscye.selectors';
import { BottomArmscyeInput } from './bottomArmscyeInput';
import { BottomArmscyePreview } from './bottomArmscyePreview';

export const bottomArmscye: ShapeConfiguration = {
  name: Shape.BottomArmscye,
  label: 'Bottom Armscye',
  Input: BottomArmscyeInput,
  Preview: BottomArmscyePreview,
  getWidestMeasurement: (shape) =>
    isBottomArmscye(shape) ? shape.bottomWidth : undefined,
  getNumberOfStiches: (shape, widthOfOneStitch, heightOfOneRow) => {
    if (!isBottomArmscye(shape)) {
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
