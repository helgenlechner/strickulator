import React, { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { swatchState } from '../../state/swatch/swatch.state';
import { LabeledNumberInput } from '../labeledInput/LabeledNumberInput';

export const SwatchInput: FunctionComponent = () => {
  const [swatch, setSwatch] = useRecoilState(swatchState);

  const onChange = (key: string, value: number | undefined) => {
    setSwatch({ ...swatch, [key]: value });
  };

  return (
    <>
      <LabeledNumberInput
        name="numberOfStitches"
        placeholder={100}
        onChange={onChange}
        value={swatch.numberOfStitches ?? ''}
      >
        Number of Stitches
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="numberOfRows"
        placeholder={100}
        onChange={onChange}
        value={swatch.numberOfRows ?? ''}
      >
        Number of Rows
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="width"
        placeholder={33.65}
        onChange={onChange}
        value={swatch.width ?? ''}
      >
        Width
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="height"
        placeholder={24.76}
        onChange={onChange}
        value={swatch.height ?? ''}
      >
        Height
      </LabeledNumberInput>
    </>
  );
};
