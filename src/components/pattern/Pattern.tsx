import { useMatomo } from '@datapunt/matomo-tracker-react';
import React, { FunctionComponent, useEffect } from 'react';
import styles from './Pattern.module.css';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { ProjectId } from '../../store/project/project.model';
import { useDispatch, useSelector } from 'react-redux';
import { projectCreate } from '../../store/project/project.actions';
import { Project } from '../project/Project';
import { getProject } from '../../store/project/project.selectors';
import { AppState } from '../../store/store.model';

export const Pattern: FunctionComponent = () => {
  const { trackPageView } = useMatomo();
  const history = useHistory();
  const { projectId } = useParams<{ projectId: ProjectId }>();
  const dispatch = useDispatch();
  const project = useSelector((state: AppState) =>
    getProject(state, { projectId }),
  );

  useEffect(() => {
    trackPageView({});
  }, [trackPageView]);

  if (!project) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.pattern}>
        <p>
          All measurements are in centimeters. The preview images show you what
          will be knitted to scale. You can click on any step in the directions
          to highlight it to keep track of your knitting progress more easily.
        </p>
        <p>
          <button onClick={() => dispatch(projectCreate(history, projectId))}>
            Create new project as copy of current project
          </button>
          <button onClick={() => dispatch(projectCreate(history))}>
            Create new project from scratch
          </button>
        </p>
      </div>
      <Project />
    </div>
  );
};
