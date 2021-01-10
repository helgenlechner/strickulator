import React, { FunctionComponent } from 'react';
import { PatternProps } from '../../../store/pattern/pattern.model';
import { BackInput } from './BackInput';
import { FrontInput } from './FrontInput';
import { SharedMeasurementInput } from './SharedMeasurementInput';
import { SleeveInput } from './SleeveInput';

export const P1295Input: FunctionComponent<PatternProps> = ({ projectId }) => (
  <>
    <h3>Shared</h3>
    <SharedMeasurementInput projectId={projectId} />
    <section>
      <div>
        <h3>Back</h3>
        <BackInput projectId={projectId} />
      </div>
      <div>
        <h3>Front</h3>
        <FrontInput projectId={projectId} />
      </div>
      <div>
        <h3>Sleeve</h3>
        <SleeveInput projectId={projectId} />
      </div>
    </section>
  </>
);
