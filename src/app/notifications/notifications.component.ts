import { Component, inject } from '@angular/core';
import { CollabRequest } from '../_models/project.model';
import { ProjectService } from '../_services/project.service';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { CollabRequests } from '../_store/state/collab-request.state';
import { GetCollabRequests } from '../_store/action/collab-request.action';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {
  collabData!: CollabRequest[];
  collabData$: Observable<CollabRequest[]> = inject(Store).select(CollabRequests.getCollabRequestData);
  isCollabDataLoaded$: Observable<boolean> = inject(Store).select(CollabRequests.getIsCollabRequestDataLoaded);

  constructor(
    private _authService: AuthService,
    private _projectService: ProjectService,
    private _store: Store,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.isCollabDataLoaded$.subscribe(res => {
      if (!res) {
        this._store.dispatch(new GetCollabRequests());
      }
    });

    this.collabData$.subscribe(res => this.collabData = res);

    // const userId = this._authService.getUserID();
    // this._projectService.getAllCollabRequestForUser(userId).subscribe((res: any) => {
    //   this.collabData = res.data;
    //   console.log(this.collabData);
    // });
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
