import { Shape } from '../custom.model';
import { findShapeConfiguration } from './findShapeConfiguration';

export const findInput = (name: Shape) => findShapeConfiguration(name)?.Input;
