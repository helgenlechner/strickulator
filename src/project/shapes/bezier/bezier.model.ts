import { CustomShape, Shape } from '../../../store/project/project.model';

export interface Bezier extends CustomShape {
  shape: Shape.Bezier;
  points: { x: number; y: number }[];
}

export const isBezier = (shape: CustomShape | undefined): shape is Bezier =>
  shape?.shape === Shape.Bezier;
