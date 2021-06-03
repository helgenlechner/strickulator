import { ShapeConfiguration } from '../custom.model';
import { rectangle } from './rectangle/rectangle.configuration';
import { roundNeck } from './roundNeck/roundNeck.configuration';
import { trapezoid } from './trapezoid/trapezoid.configuration';

export const shapes: ShapeConfiguration[] = [rectangle, roundNeck, trapezoid];
