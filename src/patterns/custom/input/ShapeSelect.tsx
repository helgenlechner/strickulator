import { FunctionComponent } from 'react';
import { Shape } from '../custom.model';

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
];

export const ShapeSelect: FunctionComponent<Props> = ({ value, onChange }) => (
  <select
    value={value}
    onChange={(event) => onChange(Number(event.target.value) as Shape)}
    id="shape"
  >
    {shapeOptions.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);
