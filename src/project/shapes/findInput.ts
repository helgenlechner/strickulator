import { Shape } from '../store/custom.model';
import { findShapeConfiguration } from './findShapeConfiguration';

export const findInput = (name: Shape) => findShapeConfiguration(name)?.Input;
