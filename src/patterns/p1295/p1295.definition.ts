import { PatternDefinition } from '../../store/pattern/pattern.model';
import { P1295Directions } from './directions/Directions';
import { P1295Input } from './input/InputForm';

export const p1295Definition: PatternDefinition = {
  id: 'p1295',
  label: "1295 Men's Classical Sweater",
  description: 'V-neck, set-in long sleeve',
  inputForm: P1295Input,
  directions: P1295Directions,
};
