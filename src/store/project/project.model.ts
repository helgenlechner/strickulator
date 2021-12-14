export type ProjectId = string;

export interface ProjectProps {
  projectId: ProjectId;
}

export interface ProjectStore {
  [ProjectId: string]: Project;
}

export interface Project {
  id: ProjectId;
  label: string;
  swatch: Swatch;
  patternPieces: PatternPiece[];
  gauge?: GaugeCalculator;
  notes?: string;
  createdAt: number;
  updatedAt: number;
}

export interface Swatch {
  numberOfStitches?: number;
  numberOfRows?: number;
  width?: number;
  height?: number;
  weight?: number;
}

export interface PatternPiece {
  name: string;
  steps: Step[];
}

export type Step = {
  name: string;
  knittingStyle: KnittingStyle;
} & CustomShape;

export interface CustomShape {
  shape: Shape;
}

export enum Shape {
  Rectangle,
  Trapezoid,
  RoundNeck,
  BottomArmscye,
  Bezier,
}

export interface ShapeConfiguration {
  name: Shape;
  label: string;
  Preview: React.ComponentType<ShapeRendererProps>;
  Input: React.ComponentType<ShapeRendererProps>;
  getWidestMeasurement: (shape: Step) => number | undefined;
  getNumberOfStiches: (
    shape: Step,
    widthOfOneStitch: number | undefined,
    heightOfOneRow: number | undefined,
  ) => number;
}

export interface ShapeRendererProps {
  projectId: ProjectId;
  patternPieceIndex: number;
  stepIndex: number;
}

export enum KnittingStyle {
  flat,
  inTheRound,
}

export interface GaugeCalculator {
  width?: number;
  height?: number;
  slopeWidth?: number;
  slopeHeight?: number;
}
