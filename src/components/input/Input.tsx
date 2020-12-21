import React, { ChangeEvent, FunctionComponent } from 'react';

interface Props {
  name: string;
  placeholder: number;
  onChange: (value: number | undefined) => void;
  value: number | string;
}

export const Input: FunctionComponent<Props> = ({
  name,
  placeholder,
  onChange: onChange_,
  value,
}) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const numericValue = Number(event.target.value);

    if (isNaN(numericValue)) {
      return;
    }

    if (numericValue <= 0) {
      onChange_(undefined);

      return;
    }

    onChange_(numericValue);
  };

  return (
    <input
      type="number"
      placeholder={placeholder.toString(10)}
      name={name}
      onChange={onChange}
      value={value}
    />
  );
};
