import { Shape } from '../custom.model';
import { findShapeConfiguration } from './findShapeConfiguration';

export const findPreview = (name: Shape) =>
  findShapeConfiguration(name)?.Preview;
