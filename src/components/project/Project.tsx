import { useMatomo } from '@datapunt/matomo-tracker-react';
import React, { FunctionComponent, useEffect } from 'react';
import { ActiveStep } from '../activeStep/ActiveStep';
import { KnittingStyle } from '../knittingStyle/KnittingStyle';
import { SwatchInput } from '../swatchInput/SwatchInput';
import styles from './Project.module.css';
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

export const Project: FunctionComponent = () => {
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
    <>
      <ActiveStep />
      <div className={styles.project}>
        <Title projectId={projectId} />
        <p>
          <RavelryLink projectId={projectId} />
        </p>
        <p>
          Create new project:
          <button
            onClick={() =>
              patternId !== undefined &&
              dispatch(projectCreate(history, patternId, projectId))
            }
          >
            Copy from current project
          </button>
          <button
            onClick={() =>
              patternId !== undefined &&
              dispatch(projectCreate(history, patternId))
            }
          >
            Start from scratch
          </button>
        </p>
        <Description projectId={projectId} />
        <p>
          Please refer to the original pattern for further instructions. All
          measurements are in centimeters. The preview images show you what will
          be knitted to scale. You can click on any step in the directions to
          highlight it to keep track of your knitting progress more easily.
        </p>
        <h2>Swatch</h2>
        <SwatchInput projectId={projectId} />
        <h2>Measurements</h2>
        <div className={styles.inputForm}>
          <PatternInputForm projectId={projectId} />
        </div>
        <h2>Knitting Style</h2>
        <KnittingStyle projectId={projectId} />
        <h2>Directions</h2>
        <PatternDirections projectId={projectId} />
      </div>
    </>
  );
};
