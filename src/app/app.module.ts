import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColumnComponent } from './column/pages/column.component';
import { BoardComponent } from './board/pages/board.component';
import { TaskComponent } from './task/pages/task.component';
import { TaskShowComponent } from './task/pages/task-show/task-show.component';
import { BoardListComponent } from './board-list/pages/board-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ColumnComponent,
    BoardComponent,
    TaskComponent,
    TaskShowComponent,
    BoardListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
