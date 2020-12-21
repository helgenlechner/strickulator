import React, { FunctionComponent } from 'react';
import { Input } from '../input/Input';
import { Label } from '../label/Label';

type Props = {
  name: string;
  placeholder: number;
  children: string;
  onChange: (name: string, value: number | undefined) => void;
  value: number | string;
};

export const LabeledInput: FunctionComponent<Props> = ({
  name,
  children,
  value,
  placeholder,
  onChange,
}) => {
  const onChange_ = (value: number | undefined) => {
    onChange(name, value);

    window.localStorage.setItem(
      name,
      value === undefined ? '' : value.toString(10),
    );
  };

  return (
    <>
      <Label forInput={name}>{children}</Label>
      <Input
        name={name}
        placeholder={placeholder}
        onChange={onChange_}
        value={value ?? ''}
      />
    </>
  );
};
