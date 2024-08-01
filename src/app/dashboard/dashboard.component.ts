import { Component, inject } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ProjectService } from '../_services/project.service';
import { Project } from '../_models/project.model';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { Dashboard } from '../_store/state/dashboard.state';
import { GetDashboard } from '../_store/action/dashboard.action';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  selfCreatedProjectData!: Project[];
  collabedProjectData!: Project[];

  allProjectData$: Observable<Project[][]> = inject(Store).select(Dashboard.getCreatedAndCollabedProjects);
  isDashboardDataLoaded$: Observable<boolean> = inject(Store).select(Dashboard.getIsDashboardProjectsLoaded);

  constructor(
    private _store: Store
  ) { }

  ngOnInit(): void {
    this.isDashboardDataLoaded$.subscribe(res => {
      if (!res) {
        this._store.dispatch(new GetDashboard());
      }
    });

    this.allProjectData$.subscribe((res: any) => {
      this.selfCreatedProjectData = res[0];
      this.collabedProjectData = res[1];
    });
  }
}
