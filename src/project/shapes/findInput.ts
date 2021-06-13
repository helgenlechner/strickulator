import { Shape } from '../../store/project/project.model';
import { findShapeConfiguration } from './findShapeConfiguration';

export const findInput = (name: Shape) => findShapeConfiguration(name)?.Input;
