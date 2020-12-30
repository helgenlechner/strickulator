import { LocationStore } from './location/location.model';
import { ProjectStore } from './project/project.model';

export interface AppState {
  projects: ProjectStore;
  location: LocationStore;
}
