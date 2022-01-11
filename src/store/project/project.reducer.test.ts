import { projectMoveStepDown } from './project.actions';
import { KnittingStyle, ProjectStore, Shape } from './project.model';
import { ProjectReducer } from './project.reducer';

describe('Project Reducer', () => {
  describe('ProjectActions.moveStepDown', () => {
    it('should move the step one down', () => {
      const initialState: ProjectStore = {
        abc: {
          patternPieces: [
            {
              steps: [
                {
                  name: 'one',
                  knittingStyle: KnittingStyle.flat,
                  shape: Shape.Rectangle,
                },
                {
                  name: 'two',
                  knittingStyle: KnittingStyle.flat,
                  shape: Shape.Rectangle,
                },
                {
                  name: 'three',
                  knittingStyle: KnittingStyle.flat,
                  shape: Shape.Rectangle,
                },
                {
                  name: 'four',
                  knittingStyle: KnittingStyle.flat,
                  shape: Shape.Rectangle,
                },
              ],
              name: 'bcd',
            },
          ],
          id: 'abc',
          label: 'ABC',
          swatches: [{}],
          createdAt: 123,
          updatedAt: 234,
        },
      };
      const action = projectMoveStepDown('abc', 0, 2);

      const expected = [
        {
          name: 'one',
          knittingStyle: KnittingStyle.flat,
          shape: Shape.Rectangle,
        },
        {
          name: 'two',
          knittingStyle: KnittingStyle.flat,
          shape: Shape.Rectangle,
        },
        {
          name: 'four',
          knittingStyle: KnittingStyle.flat,
          shape: Shape.Rectangle,
        },
        {
          name: 'three',
          knittingStyle: KnittingStyle.flat,
          shape: Shape.Rectangle,
        },
      ];
      const actual = ProjectReducer(initialState, action);

      expect(actual.abc.patternPieces[0].steps).toEqual(expected);
    });
  });
});
