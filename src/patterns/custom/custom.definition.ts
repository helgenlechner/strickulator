import { PatternDefinition } from '../../store/pattern/pattern.model';
import { Directions } from './directions/Directions';
import { InputForm } from './input/InputForm';

export const customPatternDefinition: PatternDefinition = {
  id: 'custom',
  label: 'Custom Pattern',
  description:
    'Use this calculator to create your own custom knitting patterns.',
  inputForm: InputForm,
  directions: Directions,
};
