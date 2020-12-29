import React, { Fragment, FunctionComponent } from 'react';
import { Label } from '../label/Label';

interface Option {
  id: string;
  label: string;
}

interface Props {
  name: string;
  options: Option[];
  onChange: (value: string) => void;
  value: number | string;
}

export const LabeledRadioInput: FunctionComponent<Props> = ({
  options,
  onChange,
  name,
  value,
}) => {
  const onChange_ = (value_: string) => {
    onChange(value_);
  };

  return (
    <>
      {options.map((option, index) => (
        <Fragment key={option.id}>
          {index > 0 && <br />}
          <Label forInput={option.id}>{option.label}</Label>
          <input
            type="radio"
            id={option.id}
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
