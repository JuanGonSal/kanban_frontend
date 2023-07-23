import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './pages/admin.component';
import { AdminUsersComponent } from './pages/admin-users.component';
import { AdminUsersInactiveComponent } from './pages/admin-users-inactive.component';

const routes: Routes = [
    {
        path: 'users', 
        component: AdminUsersComponent, 
    },
    { 
        path: 'users-inactive', 
        component:  AdminUsersInactiveComponent
    },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }