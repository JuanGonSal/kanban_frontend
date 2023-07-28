import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AdminComponent } from './pages/admin.component';
import { AdminUsersComponent } from './pages/admin-users.component';
import { AdminUsersInactiveComponent } from './pages/admin-users-inactive.component';
import { TeamsComponent } from './teams/teams.component';
import { BoardsTeamsComponent } from './boards-teams/boards-teams.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminUsersComponent,
    AdminUsersInactiveComponent,
    TeamsComponent,
    BoardsTeamsComponent
  ],
  exports: [
    AdminComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class AdminModule { }