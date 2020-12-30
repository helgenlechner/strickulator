import React, { FunctionComponent } from 'react';
import { BackInput } from './BackInput';
import { FrontInput } from './FrontInput';
import { SharedMeasurementInput } from './SharedMeasurementInput';
import { SleeveInput } from './SleeveInput';

export const P1295Input: FunctionComponent = () => (
  <>
    <h3>Shared</h3>
    <SharedMeasurementInput />
    <section>
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
  </>
);
