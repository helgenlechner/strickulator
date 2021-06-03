import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { EditableText } from '../../../components/editableText/EditableText';
import { ProjectId } from '../../../store/project/project.model';
import { CustomStep, Shape } from '../custom.model';
import {
  customProjectUpdateStepName,
  customProjectUpdateStepShape,
} from '../store/custom.actions';
import { ShapeSelect } from './ShapeSelect';
import { Label } from '../../../components/label/Label';
import { RectangleInput } from './ShapeInput/Rectangle';
import { TrapezoidInput } from './ShapeInput/Trapezoid';
import styles from './Step.module.css';
import { RectanglePreview } from '../preview/Rectangle';
import { TrapezoidPreview } from '../preview/Trapezoid';
import { RoundNeckInput } from './ShapeInput/RoundNeck';
import { RoundNeckPreview } from '../preview/RoundNeck';

interface Props {
  projectId: ProjectId;
  patternPieceIndex: number;
  step: CustomStep;
  stepIndex: number;
}

export const Step: FunctionComponent<Props> = (props) => {
  const dispatch = useDispatch();
  const { step, ...propsToPass } = props;
  const { projectId, patternPieceIndex, stepIndex } = props;

  const onStepNameChange = (name: string) => {
    dispatch(
      customProjectUpdateStepName(
        projectId,
        patternPieceIndex,
        stepIndex,
        name,
      ),
    );
  };

  const onShapeChange = (shape: Shape) => {
    dispatch(
      customProjectUpdateStepShape(
        projectId,
        patternPieceIndex,
        stepIndex,
        shape,
      ),
    );
  };

  return (
    <li className={styles.step}>
      <div className={styles.flexContainer}>
        <div className={styles.input}>
          <EditableText
            value={step.name || `Step ${stepIndex + 1}`}
            onChange={onStepNameChange}
            component="p"
          />
          <p>
            <Label forInput="shape">Shape</Label>
            <ShapeSelect value={step.shape} onChange={onShapeChange} />
          </p>
          {step.shape === Shape.Rectangle && (
            <RectangleInput {...propsToPass} />
          )}
          {step.shape === Shape.Trapezoid && (
            <TrapezoidInput {...propsToPass} />
          )}
          {step.shape === Shape.RoundNeck && (
            <RoundNeckInput {...propsToPass} />
          )}
        </div>
        <div className={styles.preview}>
          {step.shape === Shape.Rectangle && (
            <RectanglePreview {...propsToPass} />
          )}
          {step.shape === Shape.Trapezoid && (
            <TrapezoidPreview {...propsToPass} />
          )}
          {step.shape === Shape.RoundNeck && (
            <RoundNeckPreview {...propsToPass} />
          )}
        </div>
      </div>
    </li>
  );
};
