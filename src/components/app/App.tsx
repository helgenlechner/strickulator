import React from 'react';
import { RecoilRoot } from 'recoil';
import { ActiveStep } from '../activeStep/ActiveStep';
import { BackDirections } from '../backDirections/BackDirections';
import { BackInput } from '../backInput/BackInput';
import { BackPreview } from '../backPreview/BackPreview';
import { FrontDirections } from '../frontDirections/FrontDirections';
import { FrontInput } from '../frontInput/FrontInput';
import { FrontPreview } from '../frontPreview/FrontPreview';
import { KnittingStyle } from '../knittingStyle/KnittingStyle';
import { Label } from '../label/Label';
import { SharedMeasurementInput } from '../sharedMeasurementInput/SharedMeasurementInput';
import { SleeveDirections } from '../sleeveDirections/SleeveDirections';
import { SleeveInput } from '../sleeveInput/SleeveInput';
import { SleevePreview } from '../sleevePreview/sleevePreview';
import { SwatchInput } from '../swatchInput/SwatchInput';

const styles = require('./App.module.css');

export const App = () => (
  <RecoilRoot>
    <ActiveStep />
    <div className={styles.app}>
      <h1>Swatch</h1>
      <SwatchInput />
      <h1>Measurements</h1>
      <h2>Shared</h2>
      <SharedMeasurementInput />
      <section className={styles.inputs}>
        <div>
          <h2>Back</h2>
          <BackInput />
        </div>
        <div>
          <h2>Front</h2>
          <FrontInput />
        </div>
        <div>
          <h2>Sleeve</h2>
          <SleeveInput />
        </div>
      </section>
      <h1>Knitting Style</h1>
      <KnittingStyle />
      <h1>Directions</h1>
      <h2>Back</h2>
      <section className={styles.directions}>
        <BackDirections />
        <BackPreview />
      </section>
      <h2>Front</h2>
      <section className={styles.directions}>
        <FrontDirections />
        <FrontPreview />
      </section>
      <h2>Sleeve</h2>
      <section className={styles.directions}>
        <SleeveDirections />
        <SleevePreview />
      </section>
    </div>
  </RecoilRoot>
);
