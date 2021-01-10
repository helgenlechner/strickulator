import { PatternDefinition } from '../../store/pattern/pattern.model';
import { MittensDirections } from './Directions';
import { MittensInput } from './InputForm';

export const mittensDefinition: PatternDefinition = {
  id: 'mittens',
  label: 'Lined Mittens',
  description: `This calculator generates a machine knitting pattern for lined mittens according to you gauge and desired measurements.`,
  inputForm: MittensInput,
  directions: MittensDirections,
};
