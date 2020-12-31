import { Epic, ofType } from 'redux-observable';
import { ProjectActions, projectCreate } from './project.actions';
import { getProjects } from './project.selectors';
import { filter, map } from 'rxjs/operators';
import { isNotUndefined } from '../../helpers/isNotUndefined';

const navigateToNewlyCreatedProject: Epic = (action$, state$) =>
  action$.pipe(
    ofType<ReturnType<typeof projectCreate>>(ProjectActions.create),
    map((action) => {
      const newProjectId = Object.keys(getProjects(state$.value)).reverse()[0];
      const { history } = action.payload;

      history.push(`/projects/${newProjectId}`);

      return;
    }),
    filter(isNotUndefined),
  );

export const projectEpics = [navigateToNewlyCreatedProject];
