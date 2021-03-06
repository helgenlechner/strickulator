import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSteps } from '../../store/project/project.input.selectors';
import { Step } from './Step';
import styles from './PatternPiece.module.css';
import { ProjectId } from '../../store/project/project.model';
import { AppState } from '../../store/store.model';
import {
  PatternPiece as PatternPieceModel,
  Shape,
} from '../../store/project/project.model';
import { EditableText } from '../../components/editableText/EditableText';
import {
  projectUpdatePatternPieceName,
  projectAddStep,
} from '../../store/project/project.actions';
import { getEstimatedWeightOfPatternPiece } from '../../store/project/project.patternPiece.selectors';

interface OwnProps {
  projectId: ProjectId;
  patternPiece: PatternPieceModel;
  patternPieceIndex: number;
}

export const PatternPiece: FC<OwnProps> = ({
  patternPiece,
  projectId,
  patternPieceIndex,
}) => {
  const dispatch = useDispatch();
  const estimatedWeight = useSelector((state: AppState) =>
    getEstimatedWeightOfPatternPiece(state, { projectId, patternPieceIndex }),
  );

  const onNameChange = (value: string) => {
    dispatch(
      projectUpdatePatternPieceName(projectId, patternPieceIndex, value),
    );
  };

  const onAddStepClicked = () => {
    dispatch(projectAddStep(projectId, patternPieceIndex, Shape.Rectangle));
  };

  const steps =
    useSelector((state: AppState) =>
      getSteps(state, { projectId, patternPieceIndex }),
    ) ?? [];

  return (
    <div className={styles.container}>
      <EditableText
        value={patternPiece.name || 'New Pattern Piece'}
        onChange={onNameChange}
        component="h3"
      />
      {estimatedWeight && (
        <p>Estimated Weight: {Math.round(estimatedWeight)}</p>
      )}
      <ul className={styles.stepList}>
        {steps.map((step, stepIndex) => (
          <Step
            key={stepIndex}
            step={step}
            stepIndex={stepIndex}
            patternPieceIndex={patternPieceIndex}
            projectId={projectId}
            isLastStep={stepIndex === steps.length - 1}
          />
        ))}
      </ul>
      <button className={styles.addStepButton} onClick={onAddStepClicked}>
        Add Step
      </button>
    </div>
  );
};
