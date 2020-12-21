import { FunctionComponent } from 'react';

const styles = require('./Section.module.css');

export const Section: FunctionComponent = ({ children }) => (
  <li className={styles.section}>{children}</li>
);
