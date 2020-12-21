import React, { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { sharedMeasurementsState } from '../../state/sharedMeasurements/sharedMeasurements.state';
import { LabeledInput } from '../labeledInput/LabeledInput';

export const SharedMeasurementInput: FunctionComponent = () => {
  const [sharedMeasurements, setSharedMeasurements] = useRecoilState(
    sharedMeasurementsState,
  );

  const onChange = (key: string, value: number | undefined) => {
    setSharedMeasurements({ ...sharedMeasurements, [key]: value });
  };

  return (
    <>
      <LabeledInput
        name="hemWidth"
        placeholder={53}
        onChange={onChange}
        value={sharedMeasurements.hemWidth ?? ''}
      >
        Width at hem
      </LabeledInput>
      <br />
      <LabeledInput
        name="hemHeight"
        placeholder={4}
        onChange={onChange}
        value={sharedMeasurements.hemHeight ?? ''}
      >
        Hem height
      </LabeledInput>
      <br />
      <LabeledInput
        name="widthBelowArmhole"
        placeholder={57}
        onChange={onChange}
        value={sharedMeasurements.widthBelowArmhole ?? ''}
      >
        Width below armhole
      </LabeledInput>
      <br />
      <LabeledInput
        name="bodiceHeightUntilArmhole"
        placeholder={40}
        onChange={onChange}
        value={sharedMeasurements.bodiceHeightUntilArmhole ?? ''}
      >
        Bodice height until armhole
      </LabeledInput>
      <br />
      <LabeledInput
        name="widthOfDecForArmhole"
        placeholder={1.5}
        onChange={onChange}
        value={sharedMeasurements.widthOfDecForArmhole ?? ''}
      >
        Width of cast off for armhole
      </LabeledInput>
      <br />
      <LabeledInput
        name="bottomArmholeHeight"
        placeholder={8}
        onChange={onChange}
        value={sharedMeasurements.bottomArmholeHeight ?? ''}
      >
        Height of bottom armhole
      </LabeledInput>
      <br />
      <LabeledInput
        name="heightBetweenArmholes"
        placeholder={9}
        onChange={onChange}
        value={sharedMeasurements.heightBetweenArmholes ?? ''}
      >
        Height between armholes
      </LabeledInput>
    </>
  );
};
