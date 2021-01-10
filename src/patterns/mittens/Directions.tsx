import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Directions } from '../../components/directions/Directions';
import { PatternProps } from '../../store/pattern/pattern.model';
import { AppState } from '../../store/store.model';
import {
  getNumberOfHandStitches,
  getNumberOfCuffRows,
} from './selectors/mittens.directions.selectors';
import { Section } from '../../components/section/Section';
import { Step } from '../../components/step/Step';
import { HighlightedValue } from '../../components/highlightedValue/HighlightedValue';
import { InnerPreview } from './InnerPreview';

interface ConnectedState {
  numberOfHandStitches: number | undefined;
  numberOfCuffRows: number | undefined;
}

const mapStateToProps = (
  state: AppState,
  ownProps: PatternProps,
): ConnectedState => ({
  numberOfHandStitches: getNumberOfHandStitches(state, ownProps),
  numberOfCuffRows: getNumberOfCuffRows(state, ownProps),
});

const MittensDirections_: FunctionComponent<ConnectedState> = ({
  numberOfHandStitches,
  numberOfCuffRows,
}) => (
  <>
    <h3>Inner Mitten/Lining</h3>
    <Directions id="inner">
      <Section id="A">
        <Step id="1">
          Cast on <HighlightedValue>{numberOfHandStitches}</HighlightedValue>{' '}
          &times; 2 stitches on waste yarn in desired pattern for cuff
          (stockinette, ribbing, brioche...).
        </Step>
        <Step id="2">
          Knit for <HighlightedValue>{numberOfCuffRows}</HighlightedValue> rows.
        </Step>
        <Step id="3">Transfer all stitches to the front bed.</Step>
      </Section>
    </Directions>
    <InnerPreview />
  </>
);

export const MittensDirections = connect(mapStateToProps)(MittensDirections_);
