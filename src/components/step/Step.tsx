import { FunctionComponent, useContext } from 'react';
import { useRecoilState } from 'recoil';
import { AreaContext } from '../../context/area.context';
import { SectionContext } from '../../context/section.context';
import { locationState } from '../../state/location/location.state';
import styles from './Step.module.css';

interface Props {
  id: string;
}

export const Step: FunctionComponent<Props> = ({ children, id }) => {
  const area = useContext(AreaContext);
  const section = useContext(SectionContext);
  const [location, setLocation] = useRecoilState(locationState);

  const stepId = `${area}_${section}_${id}`;

  const onClick = () => {
    if (location.activeStep === stepId) {
      setLocation({ activeStep: undefined });
    } else {
      setLocation({ activeStep: stepId });
    }
  };

  return (
    <span className={styles.step} id={stepId} onClick={onClick}>
      {children}
    </span>
  );
};
