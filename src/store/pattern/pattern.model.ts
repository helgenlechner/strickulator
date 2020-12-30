import { ComponentType } from 'react';

export type PatternId = string;

export interface PatternDefinition {
  id: PatternId;
  label: string;
  description: string;
  inputForm?: ComponentType;
  directions?: ComponentType;
}
