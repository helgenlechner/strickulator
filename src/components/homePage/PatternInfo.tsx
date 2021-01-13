import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { PatternDefinition } from '../../store/pattern/pattern.model';
import { projectCreate } from '../../store/project/project.actions';
import { useHistory } from 'react-router-dom';
import parse from 'html-react-parser';
import styles from './PatternInfo.module.css';

export const PatternInfo: FunctionComponent<PatternDefinition> = ({
  id,
  label,
  description,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className={styles.patternInfo}>
      <h2>{label}</h2>
      <p>{parse(description)}</p>
      <button onClick={() => dispatch(projectCreate(history, id))}>
        Start a project
      </button>
    </div>
  );
};
