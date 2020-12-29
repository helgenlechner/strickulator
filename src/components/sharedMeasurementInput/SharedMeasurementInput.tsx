import React, { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { sharedMeasurementsState } from '../../state/sharedMeasurements/sharedMeasurements.state';
import { LabeledNumberInput } from '../labeledInput/LabeledNumberInput';

export const SharedMeasurementInput: FunctionComponent = () => {
  const [sharedMeasurements, setSharedMeasurements] = useRecoilState(
    sharedMeasurementsState,
  );

  const onChange = (key: string, value: number | undefined) => {
    setSharedMeasurements({ ...sharedMeasurements, [key]: value });
  };

  return (
    <>
      <LabeledNumberInput
        name="hemWidth"
        placeholder={53}
        onChange={onChange}
        value={sharedMeasurements.hemWidth ?? ''}
      >
        Width at hem
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="hemHeight"
        placeholder={4}
        onChange={onChange}
        value={sharedMeasurements.hemHeight ?? ''}
      >
        Hem height
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="widthBelowArmhole"
        placeholder={57}
        onChange={onChange}
        value={sharedMeasurements.widthBelowArmhole ?? ''}
      >
        Width below armhole
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="bodiceHeightUntilArmhole"
        placeholder={40}
        onChange={onChange}
        value={sharedMeasurements.bodiceHeightUntilArmhole ?? ''}
      >
        Bodice height until armhole
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="widthOfDecForArmhole"
        placeholder={1.5}
        onChange={onChange}
        value={sharedMeasurements.widthOfDecForArmhole ?? ''}
      >
        Width of cast off for armhole
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="bottomArmholeHeight"
        placeholder={8}
        onChange={onChange}
        value={sharedMeasurements.bottomArmholeHeight ?? ''}
      >
        Height of bottom armhole
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="heightBetweenArmholes"
        placeholder={9}
        onChange={onChange}
        value={sharedMeasurements.heightBetweenArmholes ?? ''}
      >
        Height between armholes
      </LabeledNumberInput>
    </>
  );
};
