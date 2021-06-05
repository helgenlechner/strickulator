import { Shape, ShapeConfiguration } from '../../store/custom.model';
import { isRoundNeck } from './roundNeck.model';
import { RoundNeckInput } from './RoundNeckInput';
import { RoundNeckPreview } from './RoundNeckPreview';

export const roundNeck: ShapeConfiguration = {
  name: Shape.RoundNeck,
  label: 'Round Neck Opening',
  Input: RoundNeckInput,
  Preview: RoundNeckPreview,
  getWidestMeasurement: (shape) =>
    isRoundNeck(shape) ? shape.bottomWidth : undefined,
};
