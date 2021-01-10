import { ComponentType } from 'react';
import { ProjectId } from '../project/project.model';

export type PatternId = string;

export interface PatternProps {
  projectId: ProjectId;
}

export interface PatternDefinition {
  id: PatternId;
  label: string;
  description: string;
  url?: string;
  inputForm?: ComponentType<PatternProps>;
  directions?: ComponentType<PatternProps>;
}
