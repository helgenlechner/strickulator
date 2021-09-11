import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Dispatch } from 'redux';
import { getIsMenuVisible } from '../../store/location/location.selectors';
import {
  projectCreate,
  projectDelete,
} from '../../store/project/project.actions';
import { ProjectId } from '../../store/project/project.model';
import { AppState } from '../../store/store.model';
import styles from './Menu.module.css';
import { getMenuStructure, MenuItem } from './menu.selectors';
import { History } from 'history';
import { DeleteIcon } from '../deleteIcon/DeleteIcon';

interface ConnectedState {
  menuStructure: MenuItem[];
  menuIsVisible: boolean;
}

const mapStateToProps = (state: AppState): ConnectedState => ({
  menuStructure: getMenuStructure(state),
  menuIsVisible: getIsMenuVisible(state),
});

interface ConnectedDispatch {
  deleteProject: (projectId: ProjectId) => void;
  createProject: (history: History) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): ConnectedDispatch => ({
  deleteProject: (projectId) => dispatch(projectDelete(projectId)),
  createProject: (history) => dispatch(projectCreate(history)),
});

const Menu_: FunctionComponent<ConnectedState & ConnectedDispatch> = ({
  menuStructure,
  menuIsVisible,
  deleteProject,
  createProject,
}) => {
  const history = useHistory();

  const onDeleteClick = (projectId: string) => {
    const confirmDeletion = window.confirm(
      'Are you sure you want to delete this project?',
    );

    if (confirmDeletion) {
      deleteProject(projectId);
    }
  };

  return (
    <nav data-is-visible={menuIsVisible} className={styles.menu}>
      <h1>My Projects</h1>
      <ul>
        {menuStructure.map((project) => (
          <li key={project.id}>
            <Link to={`/projects/${project.id}`}>{project.label}</Link>
            <DeleteIcon
              onClick={() => onDeleteClick(project.id)}
              title={`Delete project "${project.label}"`}
            />
          </li>
        ))}
        <li key="new">
          <button onClick={() => createProject(history)}>
            Add new project
          </button>
        </li>
      </ul>
    </nav>
  );
};

export const Menu = connect(mapStateToProps, mapDispatchToProps)(Menu_);
