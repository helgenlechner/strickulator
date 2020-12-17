import React, { ChangeEvent } from 'react';

interface BaseProps {
  name: string;
}

interface NumberProps extends BaseProps {
  type: 'number';
  onChange: (value: number | undefined) => void;
  value: number | string;
}

interface StringProps extends BaseProps {
  type: 'text';
  onChange: (value: string) => void;
  value: string;
}

type Props = NumberProps | StringProps;

export const Input: React.FunctionComponent<Props> = ({
  type,
  name,
  onChange: onChange_,
  value,
}) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (type === 'number') {
      const numericValue = Number(event.target.value);

      if (isNaN(numericValue)) {
        return;
      }

      if (numericValue <= 0) {
        (onChange_ as NumberProps['onChange'])(undefined);

        return;
      }

      (onChange_ as NumberProps['onChange'])(numericValue);
    }
  };

  return <input type={type} name={name} onChange={onChange} value={value} />;
};
