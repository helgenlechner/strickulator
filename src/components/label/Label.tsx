import React, { FunctionComponent } from 'react';
import styles from './label.module.css';

interface Props {
  children: string;
  forInput: string;
}

export const Label: FunctionComponent<Props> = ({ children, forInput }) => (
  <label htmlFor={forInput} className={styles.label}>
    {children}
  </label>
);
