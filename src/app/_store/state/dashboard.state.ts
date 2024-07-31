import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Project } from "../../_models/project.model";
import { Injectable } from "@angular/core";
import { GetDashboard } from "../action/dashboard.action";
import { AuthService } from "../../_services/auth.service";
import { ProjectService } from "../../_services/project.service";
import { tap } from "rxjs";

export interface DashboardStateModel {
    userCreatedProjects: Project[];
    userCollabedProjects: Project[];
    isProjectsLoaded: boolean;
}

@State<DashboardStateModel>({
    name: 'Dashboard',
    defaults: {
        userCollabedProjects: [],
        userCreatedProjects: [],
        isProjectsLoaded: false
    }
})

@Injectable()
export class Dashboard {
    constructor(
        private _authService: AuthService,
        private _projectService: ProjectService
    ) { }

    @Selector()
    static getCreatedAndCollabedProjects(state: DashboardStateModel) {
        const projects = [state.userCreatedProjects, state.userCollabedProjects];
        return projects;
    }

    @Selector()
    static getIsDashboardProjectsLoaded(state: DashboardStateModel) {
        return state.isProjectsLoaded;
    }

    @Action(GetDashboard)
    getDashboardData({ getState, setState }: StateContext<DashboardStateModel>) {
        const userId = this._authService.getUserID();

        return this._projectService.getDashBoardData(userId).pipe(tap((res: any) => {
            const state = getState();
            setState({
                ...state,
                userCreatedProjects: res[0],
                userCollabedProjects: res[1],
                isProjectsLoaded: true
            })
        }));
    }
}