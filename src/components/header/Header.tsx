import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { locationToggleMenuVisibility } from '../../store/location/location.actions';
import styles from './Header.module.css';

export const Header: FunctionComponent = () => {
  const dispatch = useDispatch();
  return (
    <div className={styles.header}>
      <span
        onClick={() => dispatch(locationToggleMenuVisibility())}
        className={styles.dots}
      >
        <span />
        <span />
        <span />
      </span>
      <p>Strickulator</p>
    </div>
  );
};
