import { useMatomo } from '@datapunt/matomo-tracker-react';
import React, { FunctionComponent, useEffect } from 'react';
import styles from './Pattern.module.css';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { ProjectId } from '../../store/project/project.model';
import { Title } from './Title';
import { RavelryLink } from './RavelryLink';
import { Description } from './Description';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/store.model';
import {
  getPatternDirections,
  getPatternIdForProject,
  getPatternInputForm,
} from '../../store/pattern/pattern.selectors';
import { projectCreate } from '../../store/project/project.actions';
import { Project } from '../project/Project';

export const Pattern: FunctionComponent = () => {
  const { trackPageView } = useMatomo();
  const history = useHistory();
  const { projectId } = useParams<{ projectId: ProjectId }>();
  const patternId = useSelector((state: AppState) =>
    getPatternIdForProject(state, { projectId }),
  );
  const PatternInputForm = useSelector((state: AppState) =>
    getPatternInputForm(state, { projectId }),
  );
  const PatternDirections = useSelector((state: AppState) =>
    getPatternDirections(state, { projectId }),
  );
  const dispatch = useDispatch();

  useEffect(() => {
    trackPageView({});
  }, [trackPageView]);

  if (!PatternInputForm || !PatternDirections) {
    return <Redirect to="/projects/0" />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.pattern}>
        <Title projectId={projectId} />
        <p>
          <RavelryLink projectId={projectId} />
        </p>
        <Description projectId={projectId} />
        <p>
          All measurements are in centimeters. The preview images show you what
          will be knitted to scale. You can click on any step in the directions
          to highlight it to keep track of your knitting progress more easily.
        </p>
        <p>
          <button
            onClick={() =>
              patternId !== undefined &&
              dispatch(projectCreate(history, patternId, projectId))
            }
          >
            Create new project as copy of current project
          </button>
          <button
            onClick={() =>
              patternId !== undefined &&
              dispatch(projectCreate(history, patternId))
            }
          >
            Create new project from scratch
          </button>
        </p>
      </div>
      <Project />
    </div>
  );
};
