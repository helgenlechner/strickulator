import React from 'react';
import { RecoilRoot } from 'recoil';
import { BackDirections } from '../backDirections/BackDirections';
import { BackInput } from '../backInput/BackInput';
import { SwatchInput } from '../swatchInput/SwatchInput';
import './App.css';

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <h1>Swatch</h1>
        <SwatchInput />
        <h1>Back</h1>
        <h2>Input</h2>
        <BackInput />
        <h2>Directions</h2>
        <BackDirections />
      </RecoilRoot>
    </div>
  );
}

export default App;
