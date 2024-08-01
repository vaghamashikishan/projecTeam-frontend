import { Action, Selector, State, StateContext } from "@ngxs/store";
import { CollabRequest } from "../../_models/project.model";
import { Injectable } from "@angular/core";
import { GetCollabRequests } from "../action/collab-request.action";
import { ProjectService } from "../../_services/project.service";
import { AuthService } from "../../_services/auth.service";
import { tap } from "rxjs";

export interface CollabRequestStateModel {
    collabRequestData: CollabRequest[];
    isCollabRequestsLoaded: boolean;
}

@State<CollabRequestStateModel>({
    name: 'Collabrequest',
    defaults: {
        collabRequestData: [],
        isCollabRequestsLoaded: false
    }
})

@Injectable()
export class CollabRequests {
    constructor(
        private _authService: AuthService,
        private _projectService: ProjectService
    ) { }

    @Selector()
    static getCollabRequestData(state: CollabRequestStateModel) {
        return state.collabRequestData;
    }

    @Selector()
    static getIsCollabRequestDataLoaded(state: CollabRequestStateModel) {
        return state.isCollabRequestsLoaded;
    }

    @Action(GetCollabRequests)
    getCollabRequests({ getState, setState }: StateContext<CollabRequestStateModel>) {
        const userId = this._authService.getUserID();
        return this._projectService.getAllCollabRequestForUser(userId).pipe(tap((res: any) => {
            const state = getState();
            setState({
                ...state,
                collabRequestData: res.data,
                isCollabRequestsLoaded: true
            })
        }))
    }
}