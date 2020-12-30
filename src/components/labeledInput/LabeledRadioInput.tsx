import { useMatomo } from '@datapunt/matomo-tracker-react';
import React, { Fragment, FunctionComponent } from 'react';
import { Label } from '../label/Label';

interface Option {
  id: string | number;
  label: string;
}

interface Props {
  name: string;
  options: Option[];
  onChange: (value: string | number) => void;
  value: number | string;
}

export const LabeledRadioInput: FunctionComponent<Props> = ({
  options,
  onChange,
  name,
  value,
}) => {
  const { trackEvent } = useMatomo();

  const onChange_ = (value_: string | number) => {
    trackEvent({ category: 'input.changed', action: `${name}: ${value_}` });

    onChange(value_);
  };

  return (
    <>
      {options.map((option, index) => (
        <Fragment key={option.id}>
          {index > 0 && <br />}
          <Label forInput={option.id.toString()}>{option.label}</Label>
          <input
            type="radio"
            id={option.id.toString()}
            name={name}
            value={option.id}
            checked={value === option.id}
            onChange={() => onChange_(option.id)}
          />
        </Fragment>
      ))}
    </>
  );
};
