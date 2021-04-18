import { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { locationToggleMenuVisibility } from '../../store/location/location.actions';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { getIsMenuVisible } from '../../store/location/location.selectors';

export const Header: FunctionComponent = () => {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector(getIsMenuVisible);

  return (
    <div className={styles.header}>
      <div>
        <span
          data-is-menu-open={isMenuOpen}
          onClick={() => dispatch(locationToggleMenuVisibility())}
          className={styles.menuToggle}
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
