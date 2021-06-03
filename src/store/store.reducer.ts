import { combineReducers } from 'redux';
import { LocationReducer } from './location/location.reducer';
import { ProjectReducer } from './project/project.reducer';
import { AppState } from './store.model';

export const rootReducer = combineReducers<AppState>({
  projects: ProjectReducer,
  location: LocationReducer,
});
