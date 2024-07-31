import { Component } from '@angular/core';
import { CollabRequest } from '../_models/project.model';
import { ProjectService } from '../_services/project.service';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {
  collabData!: CollabRequest[];

  constructor(
    private _authService: AuthService,
    private _projectService: ProjectService,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const userId = this._authService.getUserID();
    this._projectService.getAllCollabRequestForUser(userId).subscribe((res: any) => {
      this.collabData = res.data;
      console.log(this.collabData);
    });
  }

  handleRequest(collabId: string, isAccepted: boolean) {
    const data = {
      collabId: collabId,
      isAccepted: isAccepted ? "true" : "false"
    };
    this._projectService.handleCollabRequest(data).subscribe((res: any) => {
      this._toastr.success(res.msg, "Done");
    });

    const index = this.collabData.findIndex(element => element._id === collabId);

    if (index !== -1) {
      this.collabData.splice(index, 1);
    }
  }
}
