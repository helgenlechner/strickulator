import { useMatomo } from '@datapunt/matomo-tracker-react';
import React, { FunctionComponent, useEffect } from 'react';
import { KnittingStyle } from '../knittingStyle/KnittingStyle';
import { SwatchInput } from '../swatchInput/SwatchInput';
import styles from './Project.module.css';
import { useParams } from 'react-router-dom';
import { ProjectId } from '../../store/project/project.model';
import { Title } from './Title';
import { GaugeCalculator } from '../gaugeCalculator/GaugeCalculator';
import { InputForm } from '../../patterns/custom/input/InputForm';

export const Project: FunctionComponent = () => {
  const { trackPageView } = useMatomo();
  const { projectId } = useParams<{ projectId: ProjectId }>();

  useEffect(() => {
    trackPageView({});
  }, [trackPageView]);

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
        <InputForm projectId={projectId} />
      </div>
      <h2>Knitting Style</h2>
      <KnittingStyle projectId={projectId} />
    </div>
  );
};
