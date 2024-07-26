import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Project } from '../_models/project.model';

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

  getAllProject() {
    return this._http.get<Project[]>(`${this.ROOT_URL}/project`);
  }

  addProject(data: any) {
    return this._http.post(`${this.ROOT_URL}/project`, data);
  }
}
