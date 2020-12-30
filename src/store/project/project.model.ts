import { PatternId } from '../pattern/pattern.model';

export type ProjectId = string;

export interface ProjectStore {
  [ProjectId: string]: Project;
}

export interface Project {
  id: ProjectId;
  patternId: PatternId;
  label: string;
  swatch: Swatch;
  measurements: Measurements;
  knittingStyle: KnittingStyle;
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
