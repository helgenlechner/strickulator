import * as React from 'react';
import styles from './DeleteIcon.module.css';

interface Props {
  onClick: () => void;
  title: string;
}

export const DeleteIcon: React.FC<Props> = ({ onClick, title }) => (
  <span className={styles.delete} onClick={onClick} title={title}>
    <i className="far fa-trash-alt"></i>
  </span>
);
