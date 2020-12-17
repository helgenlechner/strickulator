import React from 'react';
import { useRecoilState } from 'recoil';
import { swatchState } from '../../state/swatch/swatch.state';
import { LabeledInput } from '../labeledInput/LabeledInput';

export const SwatchInput: React.FunctionComponent = () => {
  const [swatch, setSwatch] = useRecoilState(swatchState);

  const onChange = (key: string, value: number | undefined) => {
    setSwatch({ ...swatch, [key]: value });
  };

  return (
    <>
      <LabeledInput
        type="number"
        name="numberOfStitches"
        onChange={onChange}
        value={swatch.numberOfStitches ?? ''}
      >
        Number of Stitches
      </LabeledInput>
      <br />
      <LabeledInput
        type="number"
        name="numberOfRows"
        onChange={onChange}
        value={swatch.numberOfRows ?? ''}
      >
        Number of Rows
      </LabeledInput>
      <br />
      <LabeledInput
        type="number"
        name="width"
        onChange={onChange}
        value={swatch.width ?? ''}
      >
        Width
      </LabeledInput>
      <br />
      <LabeledInput
        type="number"
        name="height"
        onChange={onChange}
        value={swatch.height ?? ''}
      >
        Height
      </LabeledInput>
    </>
  );
};
