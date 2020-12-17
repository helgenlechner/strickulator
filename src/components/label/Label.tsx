import React from 'react';

const styles = require('./label.module.css');

interface Props {
  children: string;
  forInput: string;
}

export const Label: React.FunctionComponent<Props> = ({
  children,
  forInput,
}) => (
  <label htmlFor={forInput} className={styles.label}>
    {children}
  </label>
);
