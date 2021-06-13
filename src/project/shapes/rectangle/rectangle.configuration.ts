import {
  Shape,
  ShapeConfiguration,
} from '../../../store/project/project.model';
import { isRectangle } from './rectangle.model';
import { getNumberOfRows, getNumberOfStitches } from './rectangle.selectors';
import { RectangleInput } from './RectangleInput';
import { RectanglePreview } from './RectanglePreview';

export const rectangle: ShapeConfiguration = {
  name: Shape.Rectangle,
  label: 'Rectangle',
  Preview: RectanglePreview,
  Input: RectangleInput,
  getWidestMeasurement: (shape) =>
    isRectangle(shape) ? shape.width : undefined,
  getNumberOfStiches: (shape, widthOfOneStitch, heightOfOneRow) => {
    if (!isRectangle(shape)) {
      return 0;
    }

    const numberOfStitches = getNumberOfStitches.resultFunc(
      shape.width,
      widthOfOneStitch,
    );
    const numberOfRows = getNumberOfRows.resultFunc(
      shape.height,
      heightOfOneRow,
    );

    if (!numberOfStitches || !numberOfRows) {
      return 0;
    }

    return numberOfStitches * numberOfRows * 2;
  },
};
