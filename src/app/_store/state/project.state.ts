import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Project } from "../../_models/project.model";
import { Injectable } from "@angular/core";
import { GetProject } from "../action/project.action";
import { ProjectService } from "../../_services/project.service";
import { tap } from "rxjs";

export interface ProjectStateModel {
    allProjects: Project[],
    isProjectsLoaded: boolean
}

@State<ProjectStateModel>({
    name: 'Project',
    defaults: {
        allProjects: [],
        isProjectsLoaded: false
    }
})

@Injectable()
export class ProjectState {
    constructor(
        private _projectService: ProjectService
    ) { }

    @Selector()
    static getProjectList(state: ProjectStateModel) {
        return state.allProjects;
    }

    @Selector()
    static getIsProjectsLoaded(state: ProjectStateModel) {
        return state.isProjectsLoaded;
    }

    @Action(GetProject)
    getProjectData({ getState, setState }: StateContext<ProjectStateModel>) {
        return this._projectService.getAllProject().pipe(tap(res => {
            const state = getState();
            setState({
                ...state,
                isProjectsLoaded: true,
                allProjects: res
            })
        }))
    }
}