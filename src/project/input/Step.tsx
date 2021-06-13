import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { ShapeSelect } from './ShapeSelect';
import styles from './Step.module.css';
import { findPreview } from '../shapes/findPreview';
import { findInput } from '../shapes/findInput';
import {
  ProjectId,
  KnittingStyle as KnittingStyleEnum,
} from '../../store/project/project.model';
import { Step as StepModel, Shape } from '../../store/project/project.model';
import { EditableText } from '../../components/editableText/EditableText';
import { Label } from '../../components/label/Label';
import { KnittingStyle } from '../../components/knittingStyle/KnittingStyle';
import { Hint } from '../../components/hint/Hint';
import {
  projectUpdateStepName,
  projectUpdateStepShape,
  projectUpdateStepKnittingStyle,
} from '../../store/project/project.actions';

interface Props {
  projectId: ProjectId;
  patternPieceIndex: number;
  step: StepModel;
  stepIndex: number;
}

export const Step: FunctionComponent<Props> = (props) => {
  const dispatch = useDispatch();
  const { step, ...propsToPass } = props;
  const { projectId, patternPieceIndex, stepIndex } = props;

  const onStepNameChange = (name: string) => {
    dispatch(
      projectUpdateStepName(projectId, patternPieceIndex, stepIndex, name),
    );
  };

  const onShapeChange = (shape: Shape) => {
    dispatch(
      projectUpdateStepShape(projectId, patternPieceIndex, stepIndex, shape),
    );
  };

  const onKnittingStyleChange = (value: KnittingStyleEnum) => {
    dispatch(
      projectUpdateStepKnittingStyle(
        projectId,
        patternPieceIndex,
        stepIndex,
        value,
      ),
    );
  };

  const Preview = findPreview(step.shape);
  const Input = findInput(step.shape);

  if (!Preview || !Input) {
    return null;
  }

  return (
    <li className={styles.step}>
      <div className={styles.flexContainer}>
        <div className={styles.input}>
          <EditableText
            value={step.name || `Step ${stepIndex + 1}`}
            onChange={onStepNameChange}
            component="p"
          />
          <Label forInput={`shape-${patternPieceIndex}-${stepIndex}`}>
            Shape
          </Label>
          <ShapeSelect value={step.shape} onChange={onShapeChange} />
          <br />
          <Input {...propsToPass} />
          <br />
          <Label forInput={`knittingStyle-${patternPieceIndex}`}>
            Double Row Counts
          </Label>
          <KnittingStyle
            value={step.knittingStyle}
            onChange={onKnittingStyleChange}
          />
          <Hint>Useful when knitting in the round</Hint>
        </div>
        <div className={styles.preview}>
          <Preview {...propsToPass} />
        </div>
      </div>
    </li>
  );
};
