import { FunctionComponent } from 'react';
import { Shape } from '../custom.model';
import styles from './ShapeSelect.module.css';

interface Props {
  value: Shape;
  onChange: (value: Shape) => void;
}

const shapeOptions = [
  {
    value: Shape.Rectangle,
    label: 'Rectangle',
  },
  {
    value: Shape.Trapezoid,
    label: 'Trapezoid',
  },
  {
    value: Shape.RoundNeck,
    label: 'Round Neck Opening',
  },
];

export const ShapeSelect: FunctionComponent<Props> = ({ value, onChange }) => (
  <select
    value={value}
    onChange={(event) => onChange(Number(event.target.value) as Shape)}
    id="shape"
    className={styles.shapeSelect}
  >
    {shapeOptions.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);
