import { Component } from '@angular/core';
import { ProjectService } from '../_services/project.service';
import { Project } from '../_models/project.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss'
})
export class ExploreComponent {
  constructor(
    private _project: ProjectService
  ) { }

  projectData!: Project[];

  ngOnInit(): void {
    this._project.getAllProject().subscribe((res) => {
      this.projectData = res;
    });
  }
}
