import * as React from 'react';
import styles from './moveUpDownIcons.module.css';

interface Props {
  onClick: () => void;
}

export const MoveUpIcon: React.FC<Props> = ({ onClick }) => (
  <div title="Move Up" className={styles.icon} onClick={onClick}>
    <span className="fa fa-arrow-up" />
  </div>
);
