import { Shape, ShapeConfiguration } from '../../store/custom.model';
import { isTrapezoid } from './trapezoid.model';
import {
  getNumberOfBottomStitches,
  getNumberOfRows,
  getNumberOfTopStitches,
} from './trapezoid.selectors';
import { TrapezoidInput } from './TrapezoidInput';
import { TrapezoidPreview } from './TrapezoidPreview';

export const trapezoid: ShapeConfiguration = {
  name: Shape.Trapezoid,
  label: 'Trapezoid',
  Preview: TrapezoidPreview,
  Input: TrapezoidInput,
  getWidestMeasurement: (shape) =>
    isTrapezoid(shape)
      ? Math.max(shape.bottomWidth ?? 0, shape.topWidth ?? 0)
      : undefined,
  getNumberOfStiches: (shape, widthOfOneStitch, heightOfOneRow) => {
    if (!isTrapezoid(shape)) {
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

    return (
      numberOfRows * ((bottomNumberOfStiches + topNumberOfStiches) / 2) * 2
    );
  },
};
