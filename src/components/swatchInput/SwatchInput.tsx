import React, { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { swatchState } from '../../state/swatch/swatch.state';
import { LabeledInput } from '../labeledInput/LabeledInput';

export const SwatchInput: FunctionComponent = () => {
  const [swatch, setSwatch] = useRecoilState(swatchState);

  const onChange = (key: string, value: number | undefined) => {
    setSwatch({ ...swatch, [key]: value });
  };

  return (
    <>
      <LabeledInput
        name="numberOfStitches"
        placeholder={100}
        onChange={onChange}
        value={swatch.numberOfStitches ?? ''}
      >
        Number of Stitches
      </LabeledInput>
      <br />
      <LabeledInput
        name="numberOfRows"
        placeholder={100}
        onChange={onChange}
        value={swatch.numberOfRows ?? ''}
      >
        Number of Rows
      </LabeledInput>
      <br />
      <LabeledInput
        name="width"
        placeholder={33.65}
        onChange={onChange}
        value={swatch.width ?? ''}
      >
        Width
      </LabeledInput>
      <br />
      <LabeledInput
        name="height"
        placeholder={24.76}
        onChange={onChange}
        value={swatch.height ?? ''}
      >
        Height
      </LabeledInput>
    </>
  );
};
