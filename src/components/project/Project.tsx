import { useMatomo } from '@datapunt/matomo-tracker-react';
import React, { FunctionComponent, useEffect } from 'react';
import { KnittingStyle } from '../knittingStyle/KnittingStyle';
import { SwatchInput } from '../swatchInput/SwatchInput';
import styles from './Project.module.css';
import { Redirect, useParams } from 'react-router-dom';
import { ProjectId } from '../../store/project/project.model';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/store.model';
import {
  getPatternDirections,
  getPatternInputForm,
} from '../../store/pattern/pattern.selectors';
import { Title } from './Title';
import { GaugeCalculator } from '../gaugeCalculator/GaugeCalculator';

export const Project: FunctionComponent = () => {
  const { trackPageView } = useMatomo();
  const { projectId } = useParams<{ projectId: ProjectId }>();
  const PatternInputForm = useSelector((state: AppState) =>
    getPatternInputForm(state, { projectId }),
  );
  const PatternDirections = useSelector((state: AppState) =>
    getPatternDirections(state, { projectId }),
  );

  useEffect(() => {
    trackPageView({});
  }, [trackPageView]);

  if (!PatternInputForm || !PatternDirections) {
    return <Redirect to="/projects/0" />;
  }

  return (
    <div className={styles.project} key={projectId}>
      <Title projectId={projectId} />
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
        <PatternInputForm projectId={projectId} />
      </div>
      <h2>Knitting Style</h2>
      <KnittingStyle projectId={projectId} />
      <h2>Directions</h2>
      <PatternDirections projectId={projectId} />
    </div>
  );
};
