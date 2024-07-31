import { Component, inject } from '@angular/core';
import { ProjectService } from '../_services/project.service';
import { Project } from '../_models/project.model';
import { forkJoin, Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { Store } from '@ngxs/store';
import { ProjectState } from '../_store/state/project.state';
import { GetProject } from '../_store/action/project.action';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss'
})
export class ExploreComponent {
  constructor(
    private _project: ProjectService,
    public _authService: AuthService,
    private _store: Store
  ) { }

  projectData!: Project[];
  projectData$: Observable<Project[]> = inject(Store).select(ProjectState.getProjectList);
  isProjectLoaded$: Observable<boolean> = inject(Store).select(ProjectState.getIsProjectsLoaded);

  ngOnInit(): void {
    this.isProjectLoaded$.subscribe(res => {
      if (!res) {
        this._store.dispatch(new GetProject());
      }
    })

    this.projectData$.subscribe(res => this.projectData = res);
  }
}
