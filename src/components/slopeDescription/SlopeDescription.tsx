import { FunctionComponent } from 'react';
import { Slope } from '../../helpers/slope';
import styles from './SlopeDescription.module.css';

interface Props {
  slope: Slope | undefined;
  doubleRowCounts?: boolean;
}

export const SlopeDescription: FunctionComponent<Props> = ({
  slope,
  doubleRowCounts = false,
}) => {
  if (!slope || slope.delta === 0) {
    return null;
  }

  if (slope && 'pattern' in slope) {
    return (
      <ul className={styles.pattern}>
        {Object.entries(slope.pattern).map((entry) => {
          const rc = Number(entry[0]);

          return (
            <li key={entry[0]}>
              RC&#8239;{doubleRowCounts ? rc * 2 : rc}:&nbsp;
              <span
                className={styles.count}
                data-delta={entry[1] / 10}
                data-sign={slope.type}
              >
                {slope.type}
                {entry[1]}
              </span>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <p>
      {slope.type}
      {slope.numberOfRows}&times;{slope.stitchDelta}
      &#8239;&bull;&#8239;RC&#8239;
      {doubleRowCounts ? slope.rowInterval * 2 : slope.rowInterval}
    </p>
  );
};
