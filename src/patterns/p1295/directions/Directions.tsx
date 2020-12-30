import React, { FunctionComponent } from 'react';
import { BackDirections } from './BackDirections';
import { BackPreview } from './BackPreview';
import { FrontDirections } from './FrontDirections';
import { FrontPreview } from './FrontPreview';
import { SleeveDirections } from './SleeveDirections';
import { SleevePreview } from './sleevePreview';

export const P1295Directions: FunctionComponent = () => (
  <>
    <h3>Back</h3>
    <section>
      <BackDirections />
      <BackPreview />
    </section>
    <h3>Front</h3>
    <section>
      <FrontDirections />
      <FrontPreview />
    </section>
    <h3>Sleeve</h3>
    <section>
      <SleeveDirections />
      <SleevePreview />
    </section>
  </>
);
