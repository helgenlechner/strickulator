import { CustomShape, Shape } from '../../../store/project/project.model';

export interface BottomArmscye extends CustomShape {
  shape: Shape.BottomArmscye;
  bottomWidth?: number;
  topWidth?: number;
  height?: number;
}

export const isBottomArmscye = (
  shape: CustomShape | undefined,
): shape is BottomArmscye => shape?.shape === Shape.BottomArmscye;
