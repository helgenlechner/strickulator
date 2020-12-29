import React, { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { knittingStyleState } from '../../state/knittingStyle/knittingStyle.state';
import { LabeledRadioInput } from '../labeledInput/LabeledRadioInput';

const options = [
  { id: 'flat', label: 'Flat' },
  { id: 'round', label: 'In the round' },
];

export const KnittingStyle: FunctionComponent = () => {
  const [knittingStyle, setKnittingStyle] = useRecoilState(knittingStyleState);

  const onChange = (value: string) =>
    setKnittingStyle({ flatOrRound: value as 'flat' | 'round' });

  return (
    <LabeledRadioInput
      name="flatOrRound"
      options={options}
      onChange={onChange}
      value={knittingStyle.flatOrRound}
    />
  );
};
