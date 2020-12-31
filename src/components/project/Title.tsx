import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { PatternProps } from '../../store/pattern/pattern.model';
import { getPatternTitle } from '../../store/pattern/pattern.selectors';
import { AppState } from '../../store/store.model';

interface ConnectedState {
  patternTitle: string | undefined;
}

const mapStateToProps = (
  state: AppState,
  props: PatternProps,
): ConnectedState => ({
  patternTitle: getPatternTitle(state, props),
});

const Title_: FunctionComponent<ConnectedState> = ({ patternTitle }) => (
  <h1>{patternTitle} Calculator</h1>
);

export const Title = connect(mapStateToProps)(Title_);
