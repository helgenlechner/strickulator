import { FunctionComponent, ReactText } from 'react';
import styles from './highlightedValue.module.css';

interface Props {
  children: ReactText[] | string | number | undefined;
}

export const HighlightedValue: FunctionComponent<Props> = ({ children }) => (
  <span className={styles.highlight}>{children}</span>
);
