import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInUpComponent } from './sign-in-up/sign-in-up.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ExploreComponent } from './explore/explore.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './_authguards/auth.guard';

const routes: Routes = [
  { path: 'login', component: SignInUpComponent },
  {
    path: 'home', canActivate: [authGuard], component: HomepageComponent, children: [
      { path: '', component: ExploreComponent },
      { path: 'explore', component: ExploreComponent },
      { path: 'project/:id', component: ProjectViewComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'add-project', component: AddProjectComponent },
      { path: 'notifications', component: NotificationsComponent },
    ]
  },
  {
    path: '**', canActivate: [authGuard], component: HomepageComponent, children: [
      { path: '', component: ExploreComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
