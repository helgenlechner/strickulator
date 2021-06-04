import { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProjectProps } from '../../store/project/project.model';
import { projectUpdateLabel } from '../../store/project/project.actions';
import { getProjectLabel } from '../../store/project/project.selectors';
import { AppState } from '../../store/store.model';
import { EditableText } from '../editableText/EditableText';

export const Title: FunctionComponent<ProjectProps> = ({ projectId }) => {
  const label = useSelector((state: AppState) =>
    getProjectLabel(state, { projectId }),
  );

  const dispatch = useDispatch();

  return (
    <EditableText
      value={label ?? 'New Project'}
      onChange={(value) => dispatch(projectUpdateLabel(projectId, value))}
      component="h1"
    />
  );
};
