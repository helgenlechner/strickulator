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
  };

  switch (component) {
    case 'h1':
      return <h1 {...props}>{value}</h1>;
    case 'h2':
      return <h2 {...props}>{value}</h2>;
    case 'h3':
      return <h3 {...props}>{value}</h3>;
    default:
      return <p {...props}>{value}</p>;
  }
};
