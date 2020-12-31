import { useMatomo } from '@datapunt/matomo-tracker-react';
import React, { FunctionComponent, useEffect } from 'react';
import { P1295Directions } from '../../patterns/p1295/directions/Directions';
import { P1295Input } from '../../patterns/p1295/input/InputForm';
import { ActiveStep } from '../activeStep/ActiveStep';
import { KnittingStyle } from '../knittingStyle/KnittingStyle';
import { SwatchInput } from '../swatchInput/SwatchInput';
import ravelryLogo from './RavelryPrimaryLogo2020-Color.png';
import styles from './Project.module.css';
import { useParams } from 'react-router-dom';
import { ProjectId } from '../../store/project/project.model';

export const Project: FunctionComponent = () => {
  const { trackPageView } = useMatomo();
  const { projectId } = useParams<{ projectId: ProjectId }>();

  useEffect(() => {
    trackPageView({});
  }, [trackPageView]);

  return (
    <>
      <ActiveStep />
      <div className={styles.project}>
        <h1>1295 Men's Classical Sweater Calculator</h1>
        <p>
          <a href="https://ravel.me/1295-mens-classical">
            <img
              src={ravelryLogo}
              alt="View on Ravelry"
              title="View on Ravelry"
              height="20"
            />
          </a>
        </p>
        <p>
          This calculator generates a machine knitting pattern for a classic
          V-neck sweater according to your gauge and desired measurements, based
          on <i>1295 Men's Classical</i> from{' '}
          <a href="http://machineknittingetc.com/passap-03-pattern-book.html">
            Passap Model Book 3
          </a>
          .
        </p>
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
          <P1295Input projectId={projectId} />
        </div>
        <h2>Knitting Style</h2>
        <KnittingStyle projectId={projectId} />
        <h2>Directions</h2>
        <P1295Directions projectId={projectId} />
      </div>
    </>
  );
};
