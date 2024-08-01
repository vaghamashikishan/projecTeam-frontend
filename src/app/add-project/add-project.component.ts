import { Component, inject, ViewChild } from '@angular/core';
import { ProjectService } from '../_services/project.service';
import { ToastrService } from 'ngx-toastr';
import { Project, Technology } from '../_models/project.model';
import { AuthService } from '../_services/auth.service';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { ProjectState } from '../_store/state/project.state';
import { GetTechnologies } from '../_store/action/project.action';


@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss'
})
export class AddProjectComponent {
  projectTitle: string = "";
  projectDescription: string = "";
  collabSkills!: string[];
  project = new Project();

  allTechnologies!: Technology[];
  selectedTechnologies!: Technology[];

  allTechnologies$: Observable<Technology[]> = inject(Store).select(ProjectState.getAllTechnologies);
  isTechnologiesLoaded$: Observable<boolean> = inject(Store).select(ProjectState.getTechnologiesLoaded);

  constructor(
    private _projectService: ProjectService,
    private _authService: AuthService,
    private _toastr: ToastrService,
    private _store: Store
  ) {
    console.log("hi");

  }

  ngOnInit() {
    this.isTechnologiesLoaded$.subscribe(res => {
      if (!res) {
        this._store.dispatch(new GetTechnologies());
      }
    });

    this.allTechnologies$.subscribe(res => this.allTechnologies = res);


    // this._projectService.getTechnologyData().subscribe((res: any) => {
    //   this.allTechnologies = res;
    // });
  }

  addProject() {
    let errorMsg = "";
    if (!this.projectTitle) errorMsg += "Title is missing.";
    if (!this.projectDescription) errorMsg += "Description is missing.";
    if (!this.selectedTechnologies || this.selectedTechnologies?.length == 0) errorMsg += "Add technologies.";

    if (errorMsg.length > 0) {
      this._toastr.error(errorMsg, "Error");
      return;
    }

    this.project.ownerId = this._authService.getUserID();
    this.project.ownerName = this._authService.getUserName();
    this.project.title = this.projectTitle;
    this.project.description = this.projectDescription;
    this.project.technologies = this.selectedTechnologies;
    this.project.collabSkills = this.collabSkills;

    this._projectService.addProject(this.project).subscribe((res: any) => {
      this.projectTitle = "";
      this.projectDescription = "";
      this.selectedTechnologies = [];
      this.collabSkills = [];

      this._toastr.success(res.msg, "Done");
    })
  }
}
