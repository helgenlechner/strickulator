import { ChangeEvent, FunctionComponent } from 'react';
import styles from './Input.module.css';

interface Props {
  name: string;
  placeholder?: number;
  onChange: (value: number | undefined) => void;
  value: number | string;
  unit?: string;
}

export const Input: FunctionComponent<Props> = ({
  name,
  placeholder,
  onChange: onChange_,
  value,
  unit,
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
    <>
      <input
        className={styles.input}
        type="number"
        placeholder={placeholder?.toString(10)}
        name={name}
        onChange={onChange}
        value={value}
        id={name}
      />
      {unit && <span>{unit}</span>}
    </>
  );
};
