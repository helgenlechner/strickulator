import React from 'react';
import { useRecoilState } from 'recoil';
import { backState } from '../../state/back/back.state';
import { LabeledInput } from '../labeledInput/LabeledInput';

export const BackInput: React.FunctionComponent = () => {
  const [back, setBack] = useRecoilState(backState);

  const onChange = (key: string, value: number | undefined) => {
    setBack({ ...back, [key]: value });
  };

  return (
    <>
      <LabeledInput
        type="number"
        name="hemWidth"
        onChange={onChange}
        value={back.hemWidth ?? ''}
      >
        Width at hem
      </LabeledInput>
      <br />
      <LabeledInput
        type="number"
        name="hemHeight"
        onChange={onChange}
        value={back.hemHeight ?? ''}
      >
        Hem height
      </LabeledInput>
      <br />
      <LabeledInput
        type="number"
        name="widthBelowArmhole"
        onChange={onChange}
        value={back.widthBelowArmhole ?? ''}
      >
        Width below armhole
      </LabeledInput>
      <br />
      <LabeledInput
        type="number"
        name="bodiceHeightUntilArmhole"
        onChange={onChange}
        value={back.bodiceHeightUntilArmhole ?? ''}
      >
        Bodice height until armhole
      </LabeledInput>
      <br />
      <LabeledInput
        type="number"
        name="widthOfDecForArmhole"
        onChange={onChange}
        value={back.widthOfDecForArmhole ?? ''}
      >
        Width of cast off for armhole
      </LabeledInput>
      <br />
      <LabeledInput
        type="number"
        name="bottomArmholeHeight"
        onChange={onChange}
        value={back.bottomArmholeHeight ?? ''}
      >
        Height of bottom armhole
      </LabeledInput>
      <br />
      <LabeledInput
        type="number"
        name="widthBetweenArmholes"
        onChange={onChange}
        value={back.widthBetweenArmholes ?? ''}
      >
        Width between armholes
      </LabeledInput>
      <br />
      <LabeledInput
        type="number"
        name="heightBetweenArmholes"
        onChange={onChange}
        value={back.heightBetweenArmholes ?? ''}
      >
        Height between armholes
      </LabeledInput>
      <br />
      <LabeledInput
        type="number"
        name="heightAtShoulders"
        onChange={onChange}
        value={back.heightAtShoulders ?? ''}
      >
        Height at shoulders
      </LabeledInput>
      <br />
      <LabeledInput
        type="number"
        name="neckWidth"
        onChange={onChange}
        value={back.neckWidth ?? ''}
      >
        Neck width
      </LabeledInput>
    </>
  );
};
