import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Directions } from '../../components/directions/Directions';
import { PatternProps } from '../../store/pattern/pattern.model';
import { AppState } from '../../store/store.model';
import {
  getNumberOfHandStitches,
  getNumberOfCuffRows,
  getThumbRootSlope,
  getNumberOfThumbStitches,
  getNumberOfPalmRows,
  getTipSlope,
  getNumberOfStitchesAtTip,
  getNumberOfThumbRows,
} from './selectors/mittens.directions.selectors';
import { Section } from '../../components/section/Section';
import { Step } from '../../components/step/Step';
import { HighlightedValue } from '../../components/highlightedValue/HighlightedValue';
import { InnerPreview } from './InnerPreview';
import { SlopeDescription } from '../../components/slopeDescription/SlopeDescription';
import { Slope } from '../../helpers/slope';
import { OuterPreview } from './OuterPreview';

interface ConnectedState {
  numberOfHandStitches: number | undefined;
  numberOfCuffRows: number | undefined;
  thumbRootSlope: Slope | undefined;
  numberOfThumbStitches: number | undefined;
  numberOfPalmRows: number | undefined;
  tipSlope: Slope | undefined;
  numberOfTipStitches: number | undefined;
  numberOfThumbRows: number | undefined;
}

const mapStateToProps = (
  state: AppState,
  ownProps: PatternProps,
): ConnectedState => ({
  numberOfHandStitches: getNumberOfHandStitches(state, ownProps),
  numberOfCuffRows: getNumberOfCuffRows(state, ownProps),
  thumbRootSlope: getThumbRootSlope(state, ownProps),
  numberOfThumbStitches: getNumberOfThumbStitches(state, ownProps),
  numberOfPalmRows: getNumberOfPalmRows(state, ownProps),
  tipSlope: getTipSlope(state, ownProps),
  numberOfTipStitches: getNumberOfStitchesAtTip(state, ownProps),
  numberOfThumbRows: getNumberOfThumbRows(state, ownProps),
});

const MittensDirections_: FunctionComponent<ConnectedState> = ({
  numberOfHandStitches,
  numberOfCuffRows,
  thumbRootSlope,
  numberOfThumbStitches,
  numberOfPalmRows,
  tipSlope,
  numberOfTipStitches,
  numberOfThumbRows,
}) => (
  <>
    <h3>Inner Mitten/Lining</h3>
    <section>
      <Directions id="inner">
        <Section id="A">
          <Step id="1">
            Cast on <HighlightedValue>{numberOfHandStitches}</HighlightedValue>{' '}
            &times; 2 stitches on waste yarn in desired pattern for cuff
            (stockinette, ribbing, brioche...).
          </Step>
          <Step id="2">
            Knit for <HighlightedValue>{numberOfCuffRows}</HighlightedValue>{' '}
            rows.
          </Step>
          <Step id="3">Transfer all stitches to the front bed.</Step>
        </Section>
        <Section id="B">
          <Step id="1">
            <SlopeDescription slope={thumbRootSlope} />
          </Step>
          <Step id="2">
            There should be{' '}
            <HighlightedValue>
              {numberOfHandStitches !== undefined &&
              numberOfThumbStitches !== undefined
                ? numberOfHandStitches + numberOfThumbStitches
                : undefined}
            </HighlightedValue>{' '}
            &times; 2 stitches.
          </Step>
        </Section>
        <Section id="C">
          <Step id="1">
            Put the outer{' '}
            <HighlightedValue>{numberOfThumbStitches}</HighlightedValue>{' '}
            stitches on either end on hold off the bed.
          </Step>
          <Step id="2">
            Knit straight for{' '}
            <HighlightedValue>{numberOfPalmRows}</HighlightedValue> rows.
          </Step>
        </Section>
        <Section id="D">
          <Step id="1">
            Divide the work in half and work both tips, one after the other:
          </Step>
          <Step id="2">
            <SlopeDescription
              slope={tipSlope}
              manipulationLocation="at either end of both tips"
            />
          </Step>
          <Step id="3">
            Cast off <HighlightedValue>{numberOfTipStitches}</HighlightedValue>{' '}
            stitches.
          </Step>
        </Section>
        <Section id="E">
          <Step id="1">Put held thumb stitches back on the needles.</Step>
          <Step id="2">
            Knit straight for{' '}
            <HighlightedValue>{numberOfThumbRows}</HighlightedValue> rows.
          </Step>
          <Step id="3">
            Thread working yarn through the stitches and tie together.
          </Step>
        </Section>
      </Directions>
      <InnerPreview />
    </section>
    <h3>Outer Mitten</h3>
    <section>
      <Directions id="inner">
        <Section id="A">
          <Step id="1">
            Put the live stitches of the inner mitten on the needles and
            increase your tension so that your gauge is about 10% bigger.
          </Step>
          <Step id="2">
            <SlopeDescription slope={thumbRootSlope} />
          </Step>
          <Step id="3">
            There should be{' '}
            <HighlightedValue>
              {numberOfHandStitches !== undefined &&
              numberOfThumbStitches !== undefined
                ? numberOfHandStitches + numberOfThumbStitches
                : undefined}
            </HighlightedValue>{' '}
            &times; 2 stitches.
          </Step>
        </Section>
        <Section id="B">
          <Step id="1">
            Put the outer{' '}
            <HighlightedValue>{numberOfThumbStitches}</HighlightedValue>{' '}
            stitches on either end on hold off the bed.
          </Step>
          <Step id="2">
            Knit straight for{' '}
            <HighlightedValue>{numberOfPalmRows}</HighlightedValue> rows.
          </Step>
        </Section>
        <Section id="C">
          <Step id="1">
            Divide the work in half and work both tips, one after the other:
          </Step>
          <Step id="2">
            <SlopeDescription
              slope={tipSlope}
              manipulationLocation="at either end of both tips"
            />
          </Step>
          <Step id="3">
            Cast off <HighlightedValue>{numberOfTipStitches}</HighlightedValue>{' '}
            stitches.
          </Step>
        </Section>
        <Section id="D">
          <Step id="1">Put held thumb stitches back on the needles.</Step>
          <Step id="2">
            Knit straight for{' '}
            <HighlightedValue>{numberOfThumbRows}</HighlightedValue> rows.
          </Step>
          <Step id="3">
            Thread working yarn through the stitches and tie together.
          </Step>
        </Section>
      </Directions>
      <OuterPreview />
    </section>
  </>
);

export const MittensDirections = connect(mapStateToProps)(MittensDirections_);
