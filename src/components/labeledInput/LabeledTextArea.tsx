import { useMatomo } from '@datapunt/matomo-tracker-react';
import { ChangeEvent, FunctionComponent } from 'react';
import { Label } from '../label/Label';
import styles from './LabeledTextArea.module.css';
import TextareaAutosize from 'react-autosize-textarea';

type Props = {
  name: string;
  placeholder?: string;
  children: string;
  onChange: (name: string, value: string) => void;
  value: string;
};

export const LabeledTextArea: FunctionComponent<Props> = ({
  name,
  children,
  placeholder,
  value,
  onChange,
}) => {
  const { trackEvent } = useMatomo();

  const onChange_ = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;

    trackEvent({ category: 'input.changed', action: `${name}: ${value}` });

    onChange(name, value);
  };

  return (
    <>
      <Label forInput={name}>{children}</Label>
      <TextareaAutosize
        value={value}
        placeholder={placeholder}
        onChange={onChange_}
        className={styles.textarea}
      />
    </>
  );
};
