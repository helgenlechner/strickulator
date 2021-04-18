import { ChangeEvent, FunctionComponent } from 'react';
import styles from './Input.module.css';

interface Props {
  name: string;
  unit?: string;
}

interface NumberProps extends Props {
  placeholder?: number;
  type?: 'number';
  onChange: (value: number | undefined) => void;
  value: number | string;
}

interface TextProps extends Props {
  placeholder?: string;
  type: 'text';
  onChange: (value: string | undefined) => void;
  value: string;
}

const isNumberProps = (props: NumberProps | TextProps): props is NumberProps =>
  props.type === undefined || props.type === 'number';

export const Input: FunctionComponent<TextProps | NumberProps> = (props) => {
  const { name, placeholder, value, unit, type = 'number' } = props;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isNumberProps(props)) {
      const numericValue = Number(event.target.value);

      if (isNaN(numericValue)) {
        return;
      }

      if (numericValue <= 0) {
        props.onChange(undefined);

        return;
      }

      props.onChange(numericValue);
    } else {
      props.onChange(event.target.value);
    }
  };

  return (
    <>
      <input
        className={styles.input}
        type={type}
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
