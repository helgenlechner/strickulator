import React, { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { sleeveState } from '../../state/sleeve/sleeve.state';
import { LabeledNumberInput } from '../labeledInput/LabeledNumberInput';

export const SleeveInput: FunctionComponent = () => {
  const [sleeve, setSleeve] = useRecoilState(sleeveState);

  const onChange = (key: string, value: number | undefined) => {
    setSleeve({ ...sleeve, [key]: value });
  };

  return (
    <>
      <LabeledNumberInput
        name="wristWidth"
        placeholder={28}
        onChange={onChange}
        value={sleeve.wristWidth ?? ''}
      >
        Width at wrist
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="hemHeight"
        placeholder={6.5}
        onChange={onChange}
        value={sleeve.hemHeight ?? ''}
      >
        Hem height
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="underarmWidth"
        placeholder={41}
        onChange={onChange}
        value={sleeve.underarmWidth ?? ''}
      >
        Underarm width
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="underarmToWrist"
        placeholder={46}
        onChange={onChange}
        value={sleeve.underarmToWrist ?? ''}
      >
        Length from wrist to underarm
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="underarmToSleeveHead"
        placeholder={17}
        onChange={onChange}
        value={sleeve.underarmToSleeveHead ?? ''}
      >
        Length from underarm to sleevehead
      </LabeledNumberInput>
    </>
  );
};
