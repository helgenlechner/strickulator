import React from 'react';
import { RecoilRoot } from 'recoil';
import { BackDirections } from '../backDirections/BackDirections';
import { BackInput } from '../backInput/BackInput';
import { BackPreview } from '../backPreview/BackPreview';
import { SwatchInput } from '../swatchInput/SwatchInput';

const styles = require('./App.module.css');

function App() {
  return (
    <div className={styles.app}>
      <RecoilRoot>
        <h1>Swatch</h1>
        <SwatchInput />
        <h1>Back</h1>
        <h2>Input</h2>
        <BackInput />
        <h2>Directions</h2>
        <section className={styles.directions}>
          <BackDirections />
          <BackPreview />
        </section>
      </RecoilRoot>
    </div>
  );
}

export default App;
