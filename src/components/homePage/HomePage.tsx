import { FunctionComponent } from 'react';
import { patterns } from '../../patterns/patterns';
import { PatternInfo } from './PatternInfo';
import styles from './HomePage.module.css';

export const HomePage: FunctionComponent = () => (
  <div>
    <h1>Strickulator</h1>
    <p>
      Strickulator is a knitting pattern calculator and knitting pattern
      generator intended for machine knitters.
    </p>
    <p>
      The patterns you generate will be stored in your browser (using local
      storage) until you clear your browser session.
    </p>
    <p>
      The following patterns are available so far. Check back to see if more
      have been added:
    </p>
    <div className={styles.patternInfoContainer}>
      {patterns.map((pattern) => (
        <PatternInfo key={pattern.id} {...pattern} />
      ))}
    </div>
  </div>
);
