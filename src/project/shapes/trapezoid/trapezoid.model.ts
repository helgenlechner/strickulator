import { CustomShape, Shape } from '../../store/custom.model';

export interface Trapezoid extends CustomShape {
  shape: Shape.Trapezoid;
  bottomWidth?: number;
  topWidth?: number;
  height?: number;
}

export const isTrapezoid = (
  shape: CustomShape | undefined,
): shape is Trapezoid => shape?.shape === Shape.Trapezoid;
