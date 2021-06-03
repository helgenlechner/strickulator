import { Shape, ShapeConfiguration } from '../../custom.model';
import { isTrapezoid } from './trapezoid.model';
import { TrapezoidInput } from './TrapezoidInput';
import { TrapezoidPreview } from './TrapezoidPreview';

export const trapezoid: ShapeConfiguration = {
  name: Shape.Trapezoid,
  Preview: TrapezoidPreview,
  Input: TrapezoidInput,
  getWidestMeasurement: (shape) =>
    isTrapezoid(shape)
      ? Math.max(shape.bottomWidth ?? 0, shape.topWidth ?? 0)
      : undefined,
};
