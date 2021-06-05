import * as React from 'react';
import styles from './Hint.module.css';

export const Hint: React.FC = ({ children }) => (
  <p className={styles.hint}>{children}</p>
);
