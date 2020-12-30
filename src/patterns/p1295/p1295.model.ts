import { Measurements } from '../../store/project/project.model';

export interface P1295Measurements extends Measurements {
  hemWidth?: number;
  hemHeight?: number;
  widthBelowArmhole?: number;
  widthOfDecForArmhole?: number;
  bodiceHeightUntilArmhole?: number;
  bottomArmholeHeight?: number;
  heightBetweenArmholes?: number;
  backWidthBetweenArmholes?: number;
  backHeightAtShoulders?: number;
  neckWidth?: number;
  frontWidthBetweenArmholes?: number;
  frontHeightAtShoulders?: number;
  necklineDepth?: number;
  wristWidth?: number;
  sleeveHemHeight?: number;
  underarmWidth?: number;
  underarmToWrist?: number;
  underarmToSleeveHead?: number;
}
