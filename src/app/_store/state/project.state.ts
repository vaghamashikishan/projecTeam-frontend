import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Project, Technology } from "../../_models/project.model";
import { Injectable } from "@angular/core";
import { GetProject, GetTechnologies } from "../action/project.action";
import { ProjectService } from "../../_services/project.service";
import { tap } from "rxjs";

export interface ProjectStateModel {
    allProjects: Project[],
    isProjectsLoaded: boolean,
    allTechnologies: Technology[],
    isTechnologiesLoaded: boolean
}

@State<ProjectStateModel>({
    name: 'Project',
    defaults: {
        allProjects: [],
        isProjectsLoaded: false,
        allTechnologies: [],
        isTechnologiesLoaded: false
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

    @Selector()
    static getAllTechnologies(state: ProjectStateModel) {
        return state.allTechnologies;
    }

    @Selector()
    static getTechnologiesLoaded(state: ProjectStateModel) {
        return state.isTechnologiesLoaded;
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

    @Action(GetTechnologies)
    getAllTechnologies({ getState, setState, patchState }: StateContext<ProjectStateModel>) {
        return this._projectService.getTechnologyData().pipe(tap((res: Technology[]) => {
            const state = getState();
            patchState({
                ...state,
                allTechnologies: res,
                isTechnologiesLoaded: true
            })
        }))
    }
}