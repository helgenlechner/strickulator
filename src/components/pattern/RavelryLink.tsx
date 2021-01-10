import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { PatternProps } from '../../store/pattern/pattern.model';
import { getPatternUrl } from '../../store/pattern/pattern.selectors';
import { AppState } from '../../store/store.model';
import ravelryLogo from './RavelryPrimaryLogo2020-Color.png';

interface ConnectedState {
  patternUrl: string | undefined;
}

const mapStateToProps = (
  state: AppState,
  props: PatternProps,
): ConnectedState => ({
  patternUrl: getPatternUrl(state, props),
});

const RavelryLink_: FunctionComponent<ConnectedState> = ({ patternUrl }) => {
  if (!patternUrl) {
    return null;
  }

  return (
    <a href={patternUrl}>
      <img
        src={ravelryLogo}
        alt="View on Ravelry"
        title="View on Ravelry"
        height="20"
      />
    </a>
  );
};

export const RavelryLink = connect(mapStateToProps)(RavelryLink_);
