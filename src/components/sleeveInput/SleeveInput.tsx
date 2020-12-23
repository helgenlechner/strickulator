import React, { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { sleeveState } from '../../state/sleeve/sleeve.state';
import { LabeledInput } from '../labeledInput/LabeledInput';

export const SleeveInput: FunctionComponent = () => {
  const [sleeve, setSleeve] = useRecoilState(sleeveState);

  const onChange = (key: string, value: number | undefined) => {
    setSleeve({ ...sleeve, [key]: value });
  };

  return (
    <>
      <LabeledInput
        name="wristWidth"
        placeholder={28}
        onChange={onChange}
        value={sleeve.wristWidth ?? ''}
      >
        Width at wrist
      </LabeledInput>
      <br />
      <LabeledInput
        name="hemHeight"
        placeholder={6.5}
        onChange={onChange}
        value={sleeve.hemHeight ?? ''}
      >
        Hem height
      </LabeledInput>
      <br />
      <LabeledInput
        name="underarmWidth"
        placeholder={41}
        onChange={onChange}
        value={sleeve.underarmWidth ?? ''}
      >
        Underarm width
      </LabeledInput>
      <br />
      <LabeledInput
        name="underarmToWrist"
        placeholder={46}
        onChange={onChange}
        value={sleeve.underarmToWrist ?? ''}
      >
        Length from wrist to underarm
      </LabeledInput>
      <br />
      <LabeledInput
        name="underarmToSleeveHead"
        placeholder={17}
        onChange={onChange}
        value={sleeve.underarmToSleeveHead ?? ''}
      >
        Length from underarm to sleevehead
      </LabeledInput>
    </>
  );
};
