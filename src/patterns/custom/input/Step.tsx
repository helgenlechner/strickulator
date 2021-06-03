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
import styles from './Step.module.css';
import { findPreview } from '../shapes/findPreview';
import { findInput } from '../shapes/findInput';

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
          <Label forInput="shape">Shape</Label>
          <ShapeSelect value={step.shape} onChange={onShapeChange} />
          <br />
          <Input {...propsToPass} />
        </div>
        <div className={styles.preview}>
          <Preview {...propsToPass} />
        </div>
      </div>
    </li>
  );
};
