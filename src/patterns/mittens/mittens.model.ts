import { Measurements } from '../../store/project/project.model';

export interface MittensMeasuremets extends Measurements {
  cuffHeight?: number;
  handCircumference?: number;
  thumbCircumference?: number;
  handLength?: number;
  thumbLength?: number;
  thumbRootLength?: number;
  tipWidth?: number;
  indexFingerSideTipHeight?: number;
  pinkieSideTipHeight?: number;
}
