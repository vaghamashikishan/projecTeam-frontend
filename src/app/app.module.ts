import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInUpComponent } from './sign-in-up/sign-in-up.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TooltipModule } from 'primeng/tooltip';
import { EditorModule } from 'primeng/editor';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChipsModule } from 'primeng/chips';
import { PickListModule } from 'primeng/picklist';
import { DialogModule } from 'primeng/dialog';
import { BadgeModule } from 'primeng/badge';
import { TabViewModule } from 'primeng/tabview';

import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './homepage/homepage.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { AsterikDirective } from './_directives/asterik.directive';
import { ExploreComponent } from './explore/explore.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { ProjectState } from './_store/state/project.state';
import { Dashboard } from './_store/state/dashboard.state';

@NgModule({
  declarations: [
    AppComponent,
    SignInUpComponent,
    HomepageComponent,
    AddProjectComponent,
    AsterikDirective,
    ExploreComponent,
    ProjectViewComponent,
    NotificationsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    HttpClientModule,
    SidebarModule,
    ToolbarModule,
    SplitButtonModule,
    TooltipModule,
    EditorModule,
    MultiSelectModule,
    ChipsModule,
    PickListModule,
    DragDropModule,
    DialogModule,
    BadgeModule,
    TabViewModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      closeButton: true,
      progressBar: true,
      progressAnimation: 'decreasing'
    }),
    NgxsModule.forRoot([ProjectState, Dashboard], {}),
    NgxsLoggerPluginModule.forRoot({}),
    NgxsReduxDevtoolsPluginModule.forRoot({})
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
