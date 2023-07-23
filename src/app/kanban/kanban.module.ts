import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ColumnComponent } from './column/pages/column.component';
import { BoardComponent } from './board/pages/board.component';
import { TaskComponent } from './task/pages/task.component';
import { TaskShowComponent } from './task/pages/task-show/task-show.component';
import { BoardListComponent } from './board-list/pages/board-list.component';
import { KanbanRoutingModule } from './kanban-routing.module';

@NgModule({
  declarations: [
    ColumnComponent,
    BoardComponent,
    TaskComponent,
    TaskShowComponent,
    BoardListComponent
  ],
  exports: [
    BoardListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    KanbanRoutingModule
  ]
})
export class KanbanModule { }