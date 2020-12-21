import { FunctionComponent } from 'react';

const styles = require('./Step.module.css');

export const Step: FunctionComponent = ({ children }) => (
  <span className={styles.step}>{children}</span>
);
