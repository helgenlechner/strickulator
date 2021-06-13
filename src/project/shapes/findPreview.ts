import { Shape } from '../../store/project/project.model';
import { findShapeConfiguration } from './findShapeConfiguration';

export const findPreview = (name: Shape) =>
  findShapeConfiguration(name)?.Preview;
