import React from 'react';
import { Input } from '../input/Input';
import { Label } from '../label/Label';

type Props = {
  name: string;
  children: string;
  onChange: (name: string, value: number | undefined) => void;
  value: string | number;
  type: 'number';
};

export const LabeledInput: React.FunctionComponent<Props> = ({
  name,
  children,
  value,
  type,
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
      <Input type={type} name={name} onChange={onChange_} value={value ?? ''} />
    </>
  );
};
