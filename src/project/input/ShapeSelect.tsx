import { FunctionComponent } from 'react';
import { shapes } from '../shapes/shapes';
import { Shape } from '../../store/project/project.model';
import styles from './ShapeSelect.module.css';

interface Props {
  value: Shape;
  onChange: (value: Shape) => void;
}

const shapeOptions = shapes.map((shape) => ({
  value: shape.name,
  label: shape.label,
}));

export const ShapeSelect: FunctionComponent<Props> = ({ value, onChange }) => (
  <select
    value={value}
    onChange={(event) => onChange(Number(event.target.value) as Shape)}
    // Todo: add in patternPieceIndex and stepIndex
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
