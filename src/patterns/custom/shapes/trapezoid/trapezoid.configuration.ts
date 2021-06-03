import { Shape, ShapeConfiguration } from '../../custom.model';
import { TrapezoidInput } from './TrapezoidInput';
import { TrapezoidPreview } from './TrapezoidPreview';

export const trapezoid: ShapeConfiguration = {
  name: Shape.Trapezoid,
  Preview: TrapezoidPreview,
  Input: TrapezoidInput,
};
