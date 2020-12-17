import { FunctionComponent } from 'react';

const styles = require('./highlightedValue.module.css');

interface Props {
  children: string | number | undefined;
}

export const HighlightedValue: FunctionComponent<Props> = ({ children }) => (
  <span className={styles.highlight}>{children}</span>
);
