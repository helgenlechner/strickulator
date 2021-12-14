import { ShapeConfiguration } from '../../store/project/project.model';
import { bezier } from './bezier/bezier.configuration';
import { bottomArmscye } from './bottomArmscye/bottomArmscye.configuration';
import { rectangle } from './rectangle/rectangle.configuration';
import { roundNeck } from './roundNeck/roundNeck.configuration';
import { trapezoid } from './trapezoid/trapezoid.configuration';

export const shapes: ShapeConfiguration[] = [
  bezier,
  bottomArmscye,
  rectangle,
  roundNeck,
  trapezoid,
];
