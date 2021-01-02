import { FunctionComponent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PatternProps } from '../../store/pattern/pattern.model';
import { projectUpdateLabel } from '../../store/project/project.actions';
import { getProjectLabel } from '../../store/project/project.selectors';
import { AppState } from '../../store/store.model';
import styles from './Title.module.css';

export const Title: FunctionComponent<PatternProps> = ({ projectId }) => {
  const label = useSelector((state: AppState) =>
    getProjectLabel(state, { projectId }),
  );

  const [isBeingEdited, setIsBeingEdited] = useState(false);

  const dispatch = useDispatch();

  if (isBeingEdited) {
    return (
      <input
        className={styles.editing}
        value={label}
        onChange={(event) =>
          dispatch(projectUpdateLabel(projectId, event.currentTarget.value))
        }
        onBlur={() => setIsBeingEdited(false)}
      />
    );
  }

  return (
    <h1
      className={styles.normal}
      onClick={() => setIsBeingEdited(true)}
      title="Click to edit"
    >
      {label}
    </h1>
  );
};
