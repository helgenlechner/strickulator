import * as React from 'react';
import styles from './moveUpDownIcons.module.css';

interface Props {
  onClick: () => void;
}

export const MoveDownIcon: React.FC<Props> = ({ onClick }) => (
  <div title="Move Down" className={styles.icon} onClick={onClick}>
    <span className="fa fa-arrow-down" />
  </div>
);
