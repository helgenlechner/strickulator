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
  getNumberOfStitchesAtTip,
  getNumberOfThumbRows,
  getIndexFingerSlope,
  getPinkieFingerSlope as getPinkieSideSlope,
} from './selectors/mittens.directions.selectors';
import { Section } from '../../components/section/Section';
import { Step } from '../../components/step/Step';
import { HighlightedValue } from '../../components/highlightedValue/HighlightedValue';
import { InnerPreview } from './InnerPreview';
import { SlopeDescription } from '../../components/slopeDescription/SlopeDescription';
import { Slope } from '../../helpers/slope';
import { OuterPreview } from './OuterPreview';
import { getIsKnittedInTheRound } from '../p1295/selectors/p1295.knittingStyle.selectors';

interface ConnectedState {
  numberOfHandStitches: number | undefined;
  numberOfCuffRows: number | undefined;
  thumbRootSlope: Slope | undefined;
  numberOfThumbStitches: number | undefined;
  numberOfPalmRows: number | undefined;
  indexFingerSideTipSlope: Slope | undefined;
  pinkieSideTipSlope: Slope | undefined;
  numberOfTipStitches: number | undefined;
  numberOfThumbRows: number | undefined;
  isKnittingInTheRound: boolean;
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
  indexFingerSideTipSlope: getIndexFingerSlope(state, ownProps),
  pinkieSideTipSlope: getPinkieSideSlope(state, ownProps),
  numberOfTipStitches: getNumberOfStitchesAtTip(state, ownProps),
  numberOfThumbRows: getNumberOfThumbRows(state, ownProps),
  isKnittingInTheRound: getIsKnittedInTheRound(state, ownProps),
});

const MittensDirections_: FunctionComponent<ConnectedState> = ({
  numberOfHandStitches,
  numberOfCuffRows,
  thumbRootSlope,
  numberOfThumbStitches,
  numberOfPalmRows,
  indexFingerSideTipSlope,
  pinkieSideTipSlope,
  numberOfTipStitches,
  numberOfThumbRows,
  isKnittingInTheRound,
}) => {
  const sharedSections = (
    <>
      <Section id="B">
        <Step id="1">
          <SlopeDescription
            slope={thumbRootSlope}
            duplicateRowCounts={isKnittingInTheRound}
          />
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
          <HighlightedValue>{numberOfThumbStitches}</HighlightedValue> stitches{' '}
          {isKnittingInTheRound ? 'on both beds on one end' : 'on either end'}{' '}
          on hold off the bed.
        </Step>
        <Step id="2">
          Knit straight for{' '}
          <HighlightedValue>
            {isKnittingInTheRound && numberOfPalmRows
              ? numberOfPalmRows * 2
              : numberOfPalmRows}
          </HighlightedValue>{' '}
          rows.
        </Step>
      </Section>
      <Section id="D">
        {isKnittingInTheRound ? (
          <Step id="1">Work the tip on both beds:</Step>
        ) : (
          <Step id="1">
            Divide the work in half and work both tips, one after the other:
          </Step>
        )}
        <Step id="2">
          <SlopeDescription
            slope={pinkieSideTipSlope}
            manipulationLocation={
              isKnittingInTheRound
                ? 'at the pinkie side of both beds'
                : 'at the pinkie side of both tips'
            }
            duplicateRowCounts={isKnittingInTheRound}
          />
        </Step>
        <Step id="3">
          <SlopeDescription
            slope={indexFingerSideTipSlope}
            manipulationLocation={
              isKnittingInTheRound
                ? 'at the index finger side of both beds'
                : 'at the index finger side of both tips'
            }
            duplicateRowCounts={isKnittingInTheRound}
          />
        </Step>
        <Step id="3">
          Cast off{' '}
          <HighlightedValue>
            {isKnittingInTheRound && numberOfTipStitches
              ? numberOfTipStitches * 2
              : numberOfTipStitches}
          </HighlightedValue>{' '}
          stitches
          {isKnittingInTheRound ? ' on both beds to close the hole' : ''}.
        </Step>
      </Section>
      <Section id="E">
        <Step id="1">Put held thumb stitches back on the needles.</Step>
        <Step id="2">
          Knit straight for{' '}
          <HighlightedValue>
            {isKnittingInTheRound && numberOfThumbRows
              ? numberOfThumbRows * 2
              : numberOfThumbRows}
          </HighlightedValue>{' '}
          rows.
        </Step>
        <Step id="3">
          Thread working yarn through the stitches and tie together.
        </Step>
      </Section>
    </>
  );

  return (
    <>
      <h3>Inner Mitten/Lining</h3>
      <section>
        <Directions id="inner">
          <Section id="A">
            <Step id="1">
              Cast on{' '}
              <HighlightedValue>{numberOfHandStitches}</HighlightedValue>{' '}
              &times; 2 stitches on waste yarn in desired pattern for cuff
              (stockinette, ribbing, brioche...).
            </Step>
            <Step id="2">
              Knit for <HighlightedValue>{numberOfCuffRows}</HighlightedValue>{' '}
              rows.
            </Step>
            {isKnittingInTheRound ? (
              <Step id="3">
                Transfer all stitches to work in the round with the seam in the
                middle of the front/main bed.
              </Step>
            ) : (
              <Step id="3">Transfer all stitches to the front/main bed.</Step>
            )}
          </Section>
          {sharedSections}
        </Directions>
        <InnerPreview />
      </section>
      <h3>Outer Mitten</h3>
      <section>
        <Directions id="outer">
          <Section id="A">
            <Step id="1">
              Put the live stitches of the inner mitten on the needles and
              increase your tension so that your gauge is about 10% bigger.
            </Step>
          </Section>
          {sharedSections}
        </Directions>
        <OuterPreview />
      </section>
    </>
  );
};

export const MittensDirections = connect(mapStateToProps)(MittensDirections_);
