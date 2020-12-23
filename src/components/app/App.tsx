import React from 'react';
import { RecoilRoot } from 'recoil';
import { ActiveStep } from '../activeStep/ActiveStep';
import { BackDirections } from '../backDirections/BackDirections';
import { BackInput } from '../backInput/BackInput';
import { BackPreview } from '../backPreview/BackPreview';
import { FrontDirections } from '../frontDirections/FrontDirections';
import { FrontInput } from '../frontInput/FrontInput';
import { FrontPreview } from '../frontPreview/FrontPreview';
import { SharedMeasurementInput } from '../sharedMeasurementInput/SharedMeasurementInput';
import { SwatchInput } from '../swatchInput/SwatchInput';

const styles = require('./App.module.css');

function App() {
  return (
    <RecoilRoot>
      <ActiveStep />
      <div className={styles.app}>
        <h1>Swatch</h1>
        <SwatchInput />
        <h1>Shared Measurements</h1>
        <SharedMeasurementInput />
        <section className={styles.inputs}>
          <div>
            <h1>Back</h1>
            <BackInput />
          </div>
          <div>
            <h1>Front</h1>
            <FrontInput />
          </div>
        </section>
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
      </div>
    </RecoilRoot>
  );
}

export default App;
