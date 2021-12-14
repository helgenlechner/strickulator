import {
  Shape,
  ShapeConfiguration,
} from '../../../store/project/project.model';
import { BezierInput } from './BezierInput';
import { BezierPreview } from './BezierPreview';

export const bezier: ShapeConfiguration = {
  name: Shape.Bezier,
  label: 'Bezier Curve',
  Preview: BezierPreview,
  Input: BezierInput,
  getWidestMeasurement: (shape) => {
    return 0;
  },
  getNumberOfStiches: () => 0,
};
