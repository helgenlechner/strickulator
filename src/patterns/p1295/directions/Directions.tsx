import React, { FunctionComponent } from 'react';
import { PatternProps } from '../../../store/pattern/pattern.model';
import { BackDirections } from './BackDirections';
import { BackPreview } from './BackPreview';
import { FrontDirections } from './FrontDirections';
import { FrontPreview } from './FrontPreview';
import { SleeveDirections } from './SleeveDirections';
import { SleevePreview } from './sleevePreview';

export const P1295Directions: FunctionComponent<PatternProps> = ({
  projectId,
}) => (
  <>
    <h3>Back</h3>
    <section>
      <BackDirections projectId={projectId} />
      <BackPreview />
    </section>
    <h3>Front</h3>
    <section>
      <FrontDirections projectId={projectId} />
      <FrontPreview />
    </section>
    <h3>Sleeve</h3>
    <section>
      <SleeveDirections projectId={projectId} />
      <SleevePreview />
    </section>
  </>
);
