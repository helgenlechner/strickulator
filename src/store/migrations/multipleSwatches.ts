import { Project, Swatch } from "../project/project.model";
import { AppState } from "../store.model";

type ProjectWithSingleSwatch = Omit<Project, 'swatches'> & { swatch: Swatch };

type AppStateWithSingleSwatch = Omit<AppState, 'projects'> & { projects: Record<string, ProjectWithSingleSwatch> };

export const multipleSwatches = (state: AppStateWithSingleSwatch | undefined): AppState | undefined => {
    if (!state) {
        return state;
    }

    const projectsWithSwatches: AppState['projects'] = {};

    Object.keys(state.projects).forEach(projectId => {
        const { swatch, ...otherProperties } = state.projects[projectId];

        projectsWithSwatches[projectId] = {
            ...otherProperties,
            swatches: [swatch]
        };
    });

    return {
        ...state,
        projects: projectsWithSwatches,
    };
};