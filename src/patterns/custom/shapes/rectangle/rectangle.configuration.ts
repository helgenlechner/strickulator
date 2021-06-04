import { Shape, ShapeConfiguration } from '../../custom.model';
import { isRectangle } from './rectangle.model';
import { RectangleInput } from './RectangleInput';
import { RectanglePreview } from './RectanglePreview';

export const rectangle: ShapeConfiguration = {
  name: Shape.Rectangle,
  Preview: RectanglePreview,
  Input: RectangleInput,
  getWidestMeasurement: (shape) =>
    isRectangle(shape) ? shape.width : undefined,
};