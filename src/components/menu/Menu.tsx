import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Dispatch } from 'redux';
import { getIsMenuVisible } from '../../store/location/location.selectors';
import { PatternId } from '../../store/pattern/pattern.model';
import {
  projectCreate,
  projectDelete,
} from '../../store/project/project.actions';
import { ProjectId } from '../../store/project/project.model';
import { AppState } from '../../store/store.model';
import styles from './Menu.module.css';
import { getMenuStructure, MenuItem } from './menu.selectors';
import { History } from 'history';

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
  createProject: (history: History, patternId: PatternId) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): ConnectedDispatch => ({
  deleteProject: (projectId) => dispatch(projectDelete(projectId)),
  createProject: (history, patternId) =>
    dispatch(projectCreate(history, patternId)),
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
    <nav data-is-visible={menuIsVisible}>
      <ul>
        {menuStructure.map((pattern) => (
          <li key={pattern.id}>
            {pattern.label}
            <ul>
              {pattern.children.map((project) => (
                <li key={project.id}>
                  <Link to={`/projects/${project.id}`}>{project.label}</Link>
                  <span
                    className={styles.delete}
                    onClick={() => onDeleteClick(project.id)}
                  >
                    <i className="far fa-trash-alt"></i>
                  </span>
                </li>
              ))}
              <li key="new">
                <a onClick={() => createProject(history, pattern.id)} href="">
                  <i>Add new project</i>
                </a>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export const Menu = connect(mapStateToProps, mapDispatchToProps)(Menu_);
