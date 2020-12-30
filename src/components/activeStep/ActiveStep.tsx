import { FunctionComponent } from 'react';
import { useRecoilValue } from 'recoil';
import { getActiveStepId } from '../../state/location/location.selectors';
import styles from './ActiveStep.module.css';

export const ActiveStep: FunctionComponent = () => {
  const activeStepId = useRecoilValue(getActiveStepId);

  if (!activeStepId) {
    return null;
  }

  const target = document.getElementById(activeStepId);

  if (!target) {
    return null;
  }

  const targetRect = target.getBoundingClientRect();

  return (
    <div className={styles.container}>
      <div
        style={{
          width: targetRect.width,
          height: targetRect.height,
          top: targetRect.top + window.scrollY - 25,
          left: targetRect.left - 4,
        }}
        className={styles.activeStep}
      />
    </div>
  );
};
