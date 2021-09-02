import { ShapeConfiguration } from '../../store/project/project.model';
import { bottomArmscye } from './bottomArmscye/bottomArmscye.configuration';
import { rectangle } from './rectangle/rectangle.configuration';
import { roundNeck } from './roundNeck/roundNeck.configuration';
import { trapezoid } from './trapezoid/trapezoid.configuration';

export const shapes: ShapeConfiguration[] = [bottomArmscye, rectangle, roundNeck, trapezoid];
