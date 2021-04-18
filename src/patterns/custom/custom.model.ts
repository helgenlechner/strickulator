import { Measurements } from '../../store/project/project.model';

export interface CustomMeasurements extends Measurements {
  // @ts-ignore
  patternPieces?: CustomPatternPiece[];
}

export interface CustomPatternPiece {
  name: string;
  steps: CustomStep[];
}

export type CustomStep = { name: string } & (Rectangle | Trapezoid);

export enum Shape {
  Rectangle,
  Trapezoid,
}

export interface Rectangle {
  shape: Shape.Rectangle;
  width?: number;
  height?: number;
}

export interface Trapezoid {
  shape: Shape.Trapezoid;
  bottomWidth?: number;
  topWidth?: number;
  height?: number;
}

export const PREVIEW_FACTOR = 20;
