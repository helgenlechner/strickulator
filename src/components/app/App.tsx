import React, { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { matomo } from '../../helpers/matomo';
import { ActiveStep } from '../activeStep/ActiveStep';
import { BackDirections } from '../backDirections/BackDirections';
import { BackInput } from '../backInput/BackInput';
import { BackPreview } from '../backPreview/BackPreview';
import { FrontDirections } from '../frontDirections/FrontDirections';
import { FrontInput } from '../frontInput/FrontInput';
import { FrontPreview } from '../frontPreview/FrontPreview';
import { KnittingStyle } from '../knittingStyle/KnittingStyle';
import { MatomoProvider, useMatomo } from '@datapunt/matomo-tracker-react';
import { SharedMeasurementInput } from '../sharedMeasurementInput/SharedMeasurementInput';
import { SleeveDirections } from '../sleeveDirections/SleeveDirections';
import { SleeveInput } from '../sleeveInput/SleeveInput';
import { SleevePreview } from '../sleevePreview/sleevePreview';
import { SwatchInput } from '../swatchInput/SwatchInput';

const styles = require('./App.module.css');

export const App = () => {
  const { trackPageView } = useMatomo();

  useEffect(() => {
    console.log('tracking');
    trackPageView({});
  }, [trackPageView]);

  return (
    <MatomoProvider value={matomo}>
      <RecoilRoot>
        <ActiveStep />
        <div className={styles.app}>
          <h1>
            1295 Men's Classical Sweater Calculator{' '}
            <a href="https://ravel.me/1295-mens-classical">
              <img
                src="http://badges.ravelry.com/square_32.png"
                alt="View on Ravelry"
                title="View on Ravelry"
                width="16"
              />
            </a>
          </h1>
          <p>
            This calculator generates a machine knitting pattern for a classic
            V-neck sweater according to your gauge and desired measurements,
            based on <i>1295 Men's Classical Sweater</i> from{' '}
            <a href="http://machineknittingetc.com/passap-03-pattern-book.html">
              Passap Model Book 3
            </a>
            . Please refer to the original pattern for further instructions. All
            measurements are in centimeters. The preview images show you what
            will be knitted to scale. You can click on any step in the
            instructions to highlight it to keep track of the active step more
            easily.
          </p>
          <h2>Swatch</h2>
          <SwatchInput />
          <h2>Measurements</h2>
          <h3>Shared</h3>
          <SharedMeasurementInput />
          <section className={styles.inputs}>
            <div>
              <h3>Back</h3>
              <BackInput />
            </div>
            <div>
              <h3>Front</h3>
              <FrontInput />
            </div>
            <div>
              <h3>Sleeve</h3>
              <SleeveInput />
            </div>
          </section>
          <h2>Knitting Style</h2>
          <KnittingStyle />
          <h2>Directions</h2>
          <h3>Back</h3>
          <section className={styles.directions}>
            <BackDirections />
            <BackPreview />
          </section>
          <h3>Front</h3>
          <section className={styles.directions}>
            <FrontDirections />
            <FrontPreview />
          </section>
          <h3>Sleeve</h3>
          <section className={styles.directions}>
            <SleeveDirections />
            <SleevePreview />
          </section>
        </div>
      </RecoilRoot>
    </MatomoProvider>
  );
};
