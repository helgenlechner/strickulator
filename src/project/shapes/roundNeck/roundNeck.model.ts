import { CustomShape, Shape } from '../../store/custom.model';

export interface RoundNeck extends CustomShape {
  shape: Shape.RoundNeck;
  bottomWidth?: number;
  topWidth?: number;
  height?: number;
}

export const isRoundNeck = (
  shape: CustomShape | undefined,
): shape is RoundNeck => shape?.shape === Shape.RoundNeck;
