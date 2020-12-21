import React, { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { frontState } from '../../state/front/front.state';
import { LabeledInput } from '../labeledInput/LabeledInput';

export const FrontInput: FunctionComponent = () => {
  const [front, setFront] = useRecoilState(frontState);

  const onChange = (key: string, value: number | undefined) => {
    setFront({ ...front, [key]: value });
  };

  return (
    <>
      <LabeledInput
        placeholder={44}
        name="widthBetweenArmholes"
        onChange={onChange}
        value={front.widthBetweenArmholes ?? ''}
      >
        Width between armholes
      </LabeledInput>
      <br />
      <LabeledInput
        name="heightAtShoulders"
        placeholder={13}
        onChange={onChange}
        value={front.heightAtShoulders ?? ''}
      >
        Height at shoulders
      </LabeledInput>
      <br />
      <LabeledInput
        name="necklineDepth"
        placeholder={25}
        onChange={onChange}
        value={front.necklineDepth ?? ''}
      >
        Neckline depth
      </LabeledInput>
    </>
  );
};
