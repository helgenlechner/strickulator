import { FunctionComponent } from 'react';
import { SectionContext } from '../../context/section.context';

import styles from './Section.module.css';

interface Props {
  id: string;
}

export const Section: FunctionComponent<Props> = ({ children, id }) => (
  <SectionContext.Provider value={id}>
    <li className={styles.section}>{children}</li>
  </SectionContext.Provider>
);
