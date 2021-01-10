import React, { FunctionComponent } from 'react';
import styles from './label.module.css';

interface Props {
  children: string;
  forInput: string;
  width?: number;
}

export const Label: FunctionComponent<Props> = ({
  children,
  forInput,
  width,
}) => (
  <label htmlFor={forInput} className={styles.label} style={{ width }}>
    {children}
  </label>
);
