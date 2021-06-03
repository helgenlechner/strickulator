import { Measurements, ProjectId } from '../../store/project/project.model';

export interface CustomMeasurements extends Measurements {
  // @ts-ignore
  patternPieces?: CustomPatternPiece[];
}

export interface CustomPatternPiece {
  name: string;
  steps: CustomStep[];
}

export interface ShapeConfiguration {
  name: Shape;
  Preview: React.ComponentType<ShapeRendererProps>;
  Input: React.ComponentType<ShapeRendererProps>;
}

export interface ShapeRendererProps {
  projectId: ProjectId;
  patternPieceIndex: number;
  stepIndex: number;
}

export type CustomStep = { name: string } & (Rectangle | Trapezoid | RoundNeck);

export enum Shape {
  Rectangle,
  Trapezoid,
  RoundNeck,
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

export interface RoundNeck {
  shape: Shape.RoundNeck;
  bottomWidth?: number;
  topWidth?: number;
  height?: number;
}

export const PREVIEW_FACTOR = 20;
export const leftHalfOfPattern = 20;
export const topMargin = 10;
