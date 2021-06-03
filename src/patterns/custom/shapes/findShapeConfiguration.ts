import { Shape } from '../custom.model';
import { shapes } from './shapes';

export const findShapeConfiguration = (name: Shape) =>
  shapes.find((shape) => shape.name === name);
