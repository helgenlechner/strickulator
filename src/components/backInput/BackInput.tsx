import React, { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { backState } from '../../state/back/back.state';
import { LabeledNumberInput } from '../labeledInput/LabeledNumberInput';

export const BackInput: FunctionComponent = () => {
  const [back, setBack] = useRecoilState(backState);

  const onChange = (key: string, value: number | undefined) => {
    setBack({ ...back, [key]: value });
  };

  return (
    <>
      <LabeledNumberInput
        name="widthBetweenArmholes"
        placeholder={44}
        onChange={onChange}
        value={back.widthBetweenArmholes ?? ''}
      >
        Width between armholes
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="heightAtShoulders"
        placeholder={11}
        onChange={onChange}
        value={back.heightAtShoulders ?? ''}
      >
        Height at shoulders
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="neckWidth"
        placeholder={15}
        onChange={onChange}
        value={back.neckWidth ?? ''}
      >
        Neck width
      </LabeledNumberInput>
    </>
  );
};
