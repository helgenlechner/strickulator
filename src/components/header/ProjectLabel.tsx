import * as React from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { ProjectId } from '../../store/project/project.model';
import { getProjectLabel } from '../../store/project/project.selectors';
import { AppState } from '../../store/store.model';
import styles from './Header.module.css';

export const ProjectLabel: React.FC = () => {
  const match = useRouteMatch<{ projectId: ProjectId }>('/projects/:projectId');

  const projectLabel = useSelector(
    (state: AppState) =>
      match?.params?.projectId && getProjectLabel(state, match.params),
  );

  if (!projectLabel) {
    return null;
  }

  return <h1 className={styles.projectLabel}>{projectLabel}</h1>;
};
