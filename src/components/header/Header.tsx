import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { locationToggleMenuVisibility } from '../../store/location/location.actions';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

export const Header: FunctionComponent = () => {
  const dispatch = useDispatch();
  return (
    <div className={styles.header}>
      <div>
        <span
          onClick={() => dispatch(locationToggleMenuVisibility())}
          className={styles.dots}
        >
          <span />
          <span />
          <span />
        </span>
        <h1>
          <Link to="/">Strickulator</Link>
        </h1>
      </div>
      <p>
        <a href="mailto:hello@look-at-her-sew.com">Contact</a>
      </p>
    </div>
  );
};
