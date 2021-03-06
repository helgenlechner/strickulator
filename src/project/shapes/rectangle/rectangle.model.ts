import { CustomShape, Shape } from '../../../store/project/project.model';

export interface Rectangle extends CustomShape {
  shape: Shape.Rectangle;
  width?: number;
  height?: number;
}

export const isRectangle = (
  shape: CustomShape | undefined,
): shape is Rectangle => shape?.shape === Shape.Rectangle;
