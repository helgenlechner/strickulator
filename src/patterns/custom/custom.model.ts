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
  getWidestMeasurement: (shape: CustomShape) => number | undefined;
}

export interface ShapeRendererProps {
  projectId: ProjectId;
  patternPieceIndex: number;
  stepIndex: number;
}

export type CustomStep = { name: string } & CustomShape;

export enum Shape {
  Rectangle,
  Trapezoid,
  RoundNeck,
}

export interface CustomShape {
  shape: Shape;
}

export const previewWidth = 500;
export const leftHalfOfPattern = 20;
export const verticalMargin = 6;
