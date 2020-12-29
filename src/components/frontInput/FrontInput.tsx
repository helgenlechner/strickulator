import React, { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { frontState } from '../../state/front/front.state';
import { Label } from '../label/Label';
import { LabeledNumberInput } from '../labeledInput/LabeledNumberInput';

export const FrontInput: FunctionComponent = () => {
  const [front, setFront] = useRecoilState(frontState);

  const onChange = (key: string, value: number | undefined) => {
    setFront({ ...front, [key]: value });
  };

  return (
    <>
      <LabeledNumberInput
        placeholder={44}
        name="widthBetweenArmholes"
        onChange={onChange}
        value={front.widthBetweenArmholes ?? ''}
      >
        Width between armholes
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="heightAtShoulders"
        placeholder={13}
        onChange={onChange}
        value={front.heightAtShoulders ?? ''}
      >
        Height at shoulders
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="necklineDepth"
        placeholder={25}
        onChange={onChange}
        value={front.necklineDepth ?? ''}
      >
        Neckline depth
      </LabeledNumberInput>
    </>
  );
};
