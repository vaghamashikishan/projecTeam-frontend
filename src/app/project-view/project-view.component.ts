import { Component, ElementRef, Renderer2, ViewChild, viewChild } from '@angular/core';
import { ProjectService } from '../_services/project.service';
import { Kanban, Project } from '../_models/project.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrl: './project-view.component.scss'
})
export class ProjectViewComponent {
  projectId: string = "";
  project = new Project();
  @ViewChild('descriptionDiv') descriptionDiv!: ElementRef;
  kanban = new Kanban();
  addingNewIssue: boolean = false;
  newIssue: string = "";
  completePercentage: number = 0;
  isLikedProject: boolean = false;

  constructor(
    private _projectService: ProjectService,
    private _renderer: Renderer2,
    private _toastr: ToastrService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.projectId = this._route.snapshot.paramMap.get('id')!;
    this._projectService.getProjectByID(this.projectId).subscribe(res => {
      this.project = res;
      this._renderer.setProperty(this.descriptionDiv.nativeElement, 'innerHTML', this.project.description)
    });
    this._projectService.getKanbanByProjectId(this.projectId).subscribe((res: any) => {
      if (res !== null) {
        this.kanban = res;
        this.calculateKanbanCompletion();
      }
    })
  }

  addNewIssue() {
    console.log(this.kanban.newIssues)

    this.addingNewIssue = false;
    if (this.newIssue.length > 0) {
      this.kanban.newIssues.unshift(this.newIssue);
      this.newIssue = "";
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.calculateKanbanCompletion();
    }
  }

  updateKanban() {
    this.kanban.projectId = this.project._id;
    this._projectService.addKanban(this.kanban).subscribe((res: any) => {
      this._toastr.success(res.msg, "Success");
    });
  }

  calculateKanbanCompletion() {
    this.completePercentage = +(this.kanban.done.length / (this.kanban.newIssues.length + this.kanban.productBacklog.length + this.kanban.inProgress.length + this.kanban.done.length) * 100).toFixed(2);
  }

  likedProject() {
    this.isLikedProject = !this.isLikedProject;
    if (this.isLikedProject) this.project.likes++;
    else this.project.likes--;

    const data = {
      projectId: this.project._id,
      likes: this.project.likes
    };

    this._projectService.updateLikesOfProject(data).subscribe((res: any) => {
      this._toastr.success(res.msg, "Done");
    })
  }
}
