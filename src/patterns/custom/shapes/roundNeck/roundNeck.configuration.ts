import { Shape, ShapeConfiguration } from '../../custom.model';
import { isRoundNeck, RoundNeck } from './roundNeck.model';
import { RoundNeckInput } from './RoundNeckInput';
import { RoundNeckPreview } from './RoundNeckPreview';

export const roundNeck: ShapeConfiguration = {
  name: Shape.RoundNeck,
  Input: RoundNeckInput,
  Preview: RoundNeckPreview,
  getWidestMeasurement: (shape) =>
    isRoundNeck(shape) ? shape.bottomWidth : undefined,
};
