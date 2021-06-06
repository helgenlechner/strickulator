import { useMatomo } from '@datapunt/matomo-tracker-react';
import React, { FunctionComponent, useEffect } from 'react';
import styles from './Project.module.css';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { ProjectId } from '../../store/project/project.model';
import { useDispatch, useSelector } from 'react-redux';
import { projectCreate } from '../../store/project/project.actions';
import { getProject } from '../../store/project/project.selectors';
import { AppState } from '../../store/store.model';
import { SwatchInput } from '../swatchInput/SwatchInput';
import { GaugeCalculator } from '../gaugeCalculator/GaugeCalculator';
import { Title } from '../project/Title';
import { InputForm } from '../../project/input/InputForm';

export const Project: FunctionComponent = () => {
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
      <Title projectId={projectId} />
      <div className={styles.pattern}>
        <p>
          All measurements are in centimeters. The preview images show you what
          will be knitted to scale. You can click on any step in the directions
          to highlight it to keep track of your knitting progress more easily.
        </p>
        <p>
          <button onClick={() => dispatch(projectCreate(history, projectId))}>
            Create new project as copy of this project
          </button>
        </p>
      </div>
      <section>
        <div>
          <h2>Swatch</h2>
          <SwatchInput projectId={projectId} />
        </div>
        <div>
          <GaugeCalculator projectId={projectId} />
        </div>
      </section>
      <div className={styles.inputForm}>
        <InputForm projectId={projectId} />
      </div>
    </div>
  );
};
