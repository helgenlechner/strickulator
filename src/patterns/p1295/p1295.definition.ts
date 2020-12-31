import { PatternDefinition } from '../../store/pattern/pattern.model';
import { P1295Directions } from './directions/Directions';
import { P1295Input } from './input/InputForm';

export const p1295Definition: PatternDefinition = {
  id: 'p1295',
  label: "1295 Men's Classical Sweater",
  description: `This calculator generates a machine knitting pattern for a classic V-neck sweater according to your gauge and desired measurements, based on 1295 Men's Classical from <a href="http://machineknittingetc.com/passap-03-pattern-book.html">Passap Model Book 3</a>.`,
  url: 'https://ravel.me/1295-mens-classical',
  inputForm: P1295Input,
  directions: P1295Directions,
};
