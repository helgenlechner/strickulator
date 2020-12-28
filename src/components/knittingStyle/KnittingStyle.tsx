import React, { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { knittingStyleState } from '../../state/knittingStyle/knittingStyle.state';
import { Label } from '../label/Label';

export const KnittingStyle: FunctionComponent = () => {
  const [knittingStyle, setKnittingStyle] = useRecoilState(knittingStyleState);

  return (
    <>
      <Label forInput="flat">Flat</Label>
      <input
        type="radio"
        id="flat"
        name="flatOrRound"
        value="flat"
        checked={knittingStyle.flatOrRound === 'flat'}
        onChange={() => setKnittingStyle({ flatOrRound: 'flat' })}
      />
      <br />
      <Label forInput="round">In the round</Label>
      <input
        type="radio"
        id="round"
        name="flatOrRound"
        value="round"
        checked={knittingStyle.flatOrRound === 'round'}
        onChange={() => setKnittingStyle({ flatOrRound: 'round' })}
      />
    </>
  );
};
