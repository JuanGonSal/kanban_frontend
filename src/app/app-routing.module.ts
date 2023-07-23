import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/pages/admin.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helpers/auth.guard';
import { RegisterComponent } from './registrer/register.component';
import { AdminUsersComponent } from './admin/pages/admin-users.component';
import { AdminUsersInactiveComponent } from './admin/pages/admin-users-inactive.component';
import { TeamsComponent } from './admin/teams/teams.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
/*         data: { roles: ['admin'] } */
    },
    {
        path: 'admin/users', 
        component: AdminUsersComponent, 
    },
    {
        path: 'admin/teams', 
        component: TeamsComponent, 
    },
    { 
        path: 'admin/users-inactive', 
        component:  AdminUsersInactiveComponent
    },        
    {
        path: 'login',
        component: LoginComponent
    },
    {   path: 'register', 
        component: RegisterComponent
    },
    // otherwise redirect to home
/*     { path: '**', redirectTo: '' } */
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }