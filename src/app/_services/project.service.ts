import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Kanban, Project } from '../_models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  ROOT_URL: string = environment.BACK_END_URL;
  constructor(
    private _http: HttpClient
  ) { }

  getTechnologyData() {
    return this._http.get(`${this.ROOT_URL}/project/technologies`);
  }

  getProjectByID(projectId: string) {
    return this._http.get<Project>(`${this.ROOT_URL}/project/id/${projectId}`);
  }

  getAllProject() {
    return this._http.get<Project[]>(`${this.ROOT_URL}/project`);
  }

  addProject(data: any) {
    return this._http.post(`${this.ROOT_URL}/project`, data);
  }

  addKanban(data: Kanban) {
    return this._http.post(`${this.ROOT_URL}/project/kanban`, data);
  }

  getKanbanByProjectId(projectId: string) {
    return this._http.get(`${this.ROOT_URL}/project/kanban/${projectId}`);
  }

  updateLikesOfProject(data: any) {
    return this._http.post(`${this.ROOT_URL}/project/likes`, data);
  }

  addCollabRequest(data: any) {
    return this._http.post(`${this.ROOT_URL}/project/collab-request`, data);
  }

  getAllCollabRequestForUser(userId: string) {
    return this._http.get(`${this.ROOT_URL}/project/collab-request/${userId}`);
  }

  handleCollabRequest(data: any) {
    return this._http.post(`${this.ROOT_URL}/project/handle-collab-request`, data);
  }

  getDashBoardData(userId: string) {
    return this._http.get(`${this.ROOT_URL}/dashboard/${userId}`);
  }
}
