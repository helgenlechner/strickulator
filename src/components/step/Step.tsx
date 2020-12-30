import { FunctionComponent, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AreaContext } from '../../context/area.context';
import { SectionContext } from '../../context/section.context';
import { locationSetActiveStepId } from '../../store/location/location.actions';
import { getActiveStepId } from '../../store/location/location.selectors';
import styles from './Step.module.css';

interface Props {
  id: string;
}

export const Step: FunctionComponent<Props> = ({ children, id }) => {
  const area = useContext(AreaContext);
  const section = useContext(SectionContext);
  const activeStepId = useSelector(getActiveStepId);
  const dispatch = useDispatch();

  const stepId = `${area}_${section}_${id}`;

  const onClick = () => {
    if (activeStepId === stepId) {
      dispatch(locationSetActiveStepId(undefined));
    } else {
      dispatch(locationSetActiveStepId(stepId));
    }
  };

  return (
    <span className={styles.step} id={stepId} onClick={onClick}>
      {children}
    </span>
  );
};
