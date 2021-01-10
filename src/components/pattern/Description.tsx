import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { PatternProps } from '../../store/pattern/pattern.model';
import { getPatternDescription } from '../../store/pattern/pattern.selectors';
import { AppState } from '../../store/store.model';
import parse from 'html-react-parser';

interface ConnectedState {
  patternDescription: string | undefined;
}

const mapStateToProps = (
  state: AppState,
  props: PatternProps,
): ConnectedState => ({
  patternDescription: getPatternDescription(state, props),
});

const Description_: FunctionComponent<ConnectedState> = ({
  patternDescription,
}) => <p>{parse(patternDescription ?? '')}</p>;

export const Description = connect(mapStateToProps)(Description_);
