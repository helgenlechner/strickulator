import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { projectCreate } from '../../store/project/project.actions';
import styles from './HomePage.module.css';

export const HomePage: FunctionComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className={styles.home}>
      <h1>Strickulator</h1>
      <p>
        Strickulator is a knitting pattern calculator and knitting pattern
        generator intended for machine knitters.
      </p>
      <p>
        The patterns you create are stored in your browser (using local storage)
        until you clear your browser session.
      </p>
      <p>Preview pictures show you what will be knitted to scale.</p>
      <button onClick={() => dispatch(projectCreate(history))}>
        Create a project
      </button>
    </div>
  );
};
