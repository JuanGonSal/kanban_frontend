import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './board/pages/board.component';
import { BoardListComponent } from './board-list/pages/board-list.component';

const routes: Routes = [
    {
        path: '',
        component: BoardListComponent
    },
    { 
        path: 'board/:id', 
        component: BoardComponent 
    },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class KanbanRoutingModule { }