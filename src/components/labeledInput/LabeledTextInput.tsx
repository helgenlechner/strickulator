import { useMatomo } from '@datapunt/matomo-tracker-react';
import React, { FunctionComponent } from 'react';
import { Input } from '../input/Input';
import { Label } from '../label/Label';
import styles from './LabeledInput.module.css';

type Props = {
  name: string;
  placeholder?: string;
  children: string;
  onChange: (name: string, value: string | undefined) => void;
  value: string;
  labelWidth?: number;
  unit?: string;
  hint?: string;
  illustration?: string;
};

export const LabeledTextInput: FunctionComponent<Props> = ({
  name,
  children,
  value,
  placeholder,
  onChange,
  labelWidth,
  unit,
  hint,
  illustration,
}) => {
  const { trackEvent } = useMatomo();

  const onChange_ = (value: string | undefined) => {
    trackEvent({ category: 'input.changed', action: `${name}: ${value}` });

    onChange(name, value);
  };

  return (
    <>
      <Label forInput={name} width={labelWidth}>
        {children}
      </Label>
      <Input
        name={name}
        placeholder={placeholder}
        onChange={onChange_}
        value={value ?? ''}
        unit={unit}
        type="text"
      />
      <div className={styles.additionalContent}>
        {hint && (
          <p className={styles.hint} data-has-illustratiorn={!!illustration}>
            {hint}
          </p>
        )}
        {illustration && (
          <div className={styles.illustrationIcon}>
            <img src={illustration} alt={children} />
          </div>
        )}
      </div>
    </>
  );
};
