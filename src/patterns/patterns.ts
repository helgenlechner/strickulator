import { PatternDefinition, PatternId } from '../store/pattern/pattern.model';
import { customPatternDefinition } from './custom/custom.definition';
import { mittensDefinition } from './mittens/mittens.definition';
import { p1295Definition } from './p1295/p1295.definition';

export const patterns: PatternDefinition[] = [
  p1295Definition,
  mittensDefinition,
  customPatternDefinition,
];

export const findPattern = (patternId: PatternId | undefined) => {
  if (!patternId) {
    return undefined;
  }

  return patterns.find((pattern) => pattern.id === patternId);
};
