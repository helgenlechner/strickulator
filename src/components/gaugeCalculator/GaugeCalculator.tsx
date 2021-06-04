import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Slope } from '../../helpers/slope';
import { ProjectProps } from '../../store/project/project.model';
import { projectUpdateGaugeCalculator } from '../../store/project/project.actions';
import {
  getGaugeHeight,
  getGaugeNumberOfRows,
  getGaugeNumberOfStitches,
  getGaugeSlope,
  getGaugeSlopeHeight,
  getGaugeSlopeWidth,
  getGaugeWidth,
} from '../../store/project/project.gauge.selectors';
import { GaugeCalculator as GaugeCalculatorModel } from '../../store/project/project.model';
import {
  getHeightOfOneRow,
  getWidthOfOneStitch,
} from '../../store/project/project.swatch.selectors';
import { AppState } from '../../store/store.model';
import { HighlightedValue } from '../highlightedValue/HighlightedValue';
import { LabeledNumberInput } from '../labeledInput/LabeledNumberInput';
import { SlopeDescription } from '../slopeDescription/SlopeDescription';
import styles from './GaugeCalculator.module.css';

interface ConnectedState {
  width: number | undefined;
  height: number | undefined;
  numberOfStitches: string | undefined;
  numberOfRows: string | undefined;
  slopeWidth: number | undefined;
  slopeHeight: number | undefined;
  slope: Slope | undefined;
  hasGauge: boolean;
}

const mapStateToProps = (
  state: AppState,
  ownProps: ProjectProps,
): ConnectedState => ({
  width: getGaugeWidth(state, ownProps),
  height: getGaugeHeight(state, ownProps),
  numberOfStitches: getGaugeNumberOfStitches(state, ownProps),
  numberOfRows: getGaugeNumberOfRows(state, ownProps),
  slopeWidth: getGaugeSlopeWidth(state, ownProps),
  slopeHeight: getGaugeSlopeHeight(state, ownProps),
  slope: getGaugeSlope(state, ownProps),
  hasGauge:
    getWidthOfOneStitch(state, ownProps) !== undefined &&
    getHeightOfOneRow(state, ownProps) !== undefined,
});

interface ConnectedDispatch {
  updateGauge: (gauge: Partial<GaugeCalculatorModel>) => void;
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: ProjectProps,
): ConnectedDispatch => ({
  updateGauge: (gauge) =>
    dispatch(projectUpdateGaugeCalculator(ownProps.projectId, gauge)),
});

const GaugeCalculator_: FunctionComponent<ConnectedState & ConnectedDispatch> =
  ({
    hasGauge,
    width,
    height,
    numberOfStitches,
    numberOfRows,
    slopeWidth,
    slopeHeight,
    slope,
    updateGauge,
  }) => {
    if (!hasGauge) {
      return null;
    }

    const onChange = (key: string, value: number | undefined) => {
      updateGauge({ [key]: value });
    };

    return (
      <div className={styles.gaugeCalculator}>
        <h2>Gauge Calculator</h2>
        <p>
          Use this calculator for any ad-hoc adjustments to the pattern that has
          been generated for you (such as adding bust darts). It can calculate
          the number of stitches/rows in a measurement and slopes.
        </p>
        <div className={styles.row}>
          <div className={styles.cell}>
            <LabeledNumberInput
              name="width"
              value={width ?? ''}
              onChange={onChange}
              labelWidth={110}
              unit="cm"
            >
              Width
            </LabeledNumberInput>
          </div>
          <div className={styles.cell}>
            <HighlightedValue>{numberOfStitches}</HighlightedValue> stitches
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.cell}>
            <LabeledNumberInput
              name="height"
              value={height ?? ''}
              onChange={onChange}
              labelWidth={110}
              unit="cm"
            >
              Height
            </LabeledNumberInput>
          </div>
          <div className={styles.cell}>
            <HighlightedValue>{numberOfRows}</HighlightedValue> rows
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.cell}>
            <LabeledNumberInput
              name="slopeWidth"
              value={slopeWidth ?? ''}
              onChange={onChange}
              labelWidth={110}
              unit="cm"
            >
              Slope Width
            </LabeledNumberInput>
            <br />
            <LabeledNumberInput
              name="slopeHeight"
              value={slopeHeight ?? ''}
              onChange={onChange}
              labelWidth={110}
              unit="cm"
            >
              Slope Height
            </LabeledNumberInput>
          </div>
          <div className={styles.cell}>
            <SlopeDescription slope={slope} />
          </div>
        </div>
      </div>
    );
  };

export const GaugeCalculator = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GaugeCalculator_);
