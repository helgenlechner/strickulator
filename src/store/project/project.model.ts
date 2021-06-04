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
  measurements: Measurements;
  knittingStyle: KnittingStyle;
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
}

export interface Measurements {
  [key: string]: number | undefined;
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
