import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProjectProps } from '../../store/project/project.model';
import { AppState } from '../../store/store.model';
import { PatternPiece } from './PatternPiece';
import styles from './InputForm.module.css';
import { getMeasurements } from '../store/custom.input.selectors';
import { projectAddPatternPiece } from '../../store/project/project.actions';

export const InputForm: FC<ProjectProps> = ({ projectId }) => {
  const dispatch = useDispatch();
  const patternPieces =
    useSelector((state: AppState) => getMeasurements(state, { projectId })) ??
    [];

  const onAddPatternPieceClicked = () => {
    dispatch(projectAddPatternPiece(projectId));
  };

  return (
    <div>
      <h2>Pattern Pieces</h2>
      {patternPieces.map((patternPiece, index) => (
        <PatternPiece
          key={index}
          projectId={projectId}
          patternPieceIndex={index}
          patternPiece={patternPiece}
        />
      ))}
      <button
        className={styles.addPatternPieceButton}
        onClick={onAddPatternPieceClicked}
      >
        Add Pattern Piece
      </button>
    </div>
  );
};
