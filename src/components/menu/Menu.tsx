import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { getIsMenuVisible } from '../../store/location/location.selectors';
import { projectDelete } from '../../store/project/project.actions';
import { ProjectId } from '../../store/project/project.model';
import { AppState } from '../../store/store.model';
import styles from './Menu.module.css';
import { getMenuStructure, MenuItem } from './menu.selectors';

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
}

const mapDispatchToProps = (dispatch: Dispatch): ConnectedDispatch => ({
  deleteProject: (projectId) => dispatch(projectDelete(projectId)),
});

const Menu_: FunctionComponent<ConnectedState & ConnectedDispatch> = ({
  menuStructure,
  menuIsVisible,
  deleteProject,
}) => (
  <nav data-is-visible={menuIsVisible}>
    <ul>
      {menuStructure.map((menuItem) => (
        <li key={menuItem.id}>
          {menuItem.label}
          {menuItem.children.length && (
            <ul>
              {menuItem.children.map((child) => (
                <li key={child.id}>
                  <Link to={child.id}>{child.label}</Link>
                  <span
                    className={styles.delete}
                    onClick={() => deleteProject(child.id)}
                  >
                    <i className="far fa-trash-alt"></i>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  </nav>
);

export const Menu = connect(mapStateToProps, mapDispatchToProps)(Menu_);
