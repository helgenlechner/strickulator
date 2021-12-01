import { FunctionComponent } from 'react';
import styles from './label.module.css';

interface Props {
  children: string;
  forInput: string;
  width?: number;
}

export const Label: FunctionComponent<Props> = ({ children, width }) => (
  <label className={styles.label} style={{ width }}>
    {children}
  </label>
);
