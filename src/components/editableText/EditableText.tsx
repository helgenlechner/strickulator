import { FunctionComponent, useState } from 'react';
import styles from './EditableText.module.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
  component: 'h1' | 'h2' | 'h3' | 'p';
}

export const EditableText: FunctionComponent<Props> = ({
  value,
  onChange,
  component,
}) => {
  const [isBeingEdited, setIsBeingEdited] = useState(false);

  if (isBeingEdited) {
    return (
      <>
        <input
          className={styles.editing}
          data-component={component}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={() => setIsBeingEdited(false)}
        />
        <br />
      </>
    );
  }

  const props = {
    className: styles.normal,
    onClick: () => setIsBeingEdited(true),
    title: 'Click to edit',
    children: value,
  };

  switch (component) {
    case 'h1':
      return <h1 {...props} />;
    case 'h2':
      return <h2 {...props} />;
    case 'h3':
      return <h3 {...props} />;
    default:
      return <p {...props} />;
  }
};
