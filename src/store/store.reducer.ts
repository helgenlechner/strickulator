import { combineReducers } from 'redux';
import { LocationReducer } from './location/location.reducer';
import { ProjectReducer } from './project/project.reducer';

export const rootReducer = combineReducers({
  projects: ProjectReducer,
  location: LocationReducer,
});
