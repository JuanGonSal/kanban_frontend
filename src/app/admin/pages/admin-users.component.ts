import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from 'src/app/_models/user';

import { UserService } from 'src/app/_services/user.service';
import { RolService } from 'src/app/_services/rol.service';
import { TeamService } from 'src/app/_services/team.service';

import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({   
    selector: 'app-admin-user',
    templateUrl: 'admin-users.component.html' 
})

export class AdminUsersComponent implements OnInit {
    loading = false;
    users: User[] = [];
    roles?: any;
    teams?: any;
    selectedItems: any[] = []; // Array to store the selected options
    dropdownSettings: IDropdownSettings; // Settings for the dropdown
    backupData: any;
    editando: boolean = false;

    constructor(
        private userService: UserService,
        private rolService: RolService,
        private teamService: TeamService
    ) {
        this.dropdownSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'name',
        };
     }

    ngOnInit() {
        this.getRows();
    }

    filaEditada: any;

    getRows(){
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            users?.forEach((user) => { user.editando = false});
            this.users = users;
        });
        this.rolService.getAll().pipe(first()).subscribe(roles => {
            this.roles = roles;
        });
        this.teamService.getAll().pipe(first()).subscribe(teams => {
            this.teams = teams;
        });
        this.loading = false;
    }

    editRow(user: any) {
        this.editando = true;
        this.backupData = { ...user };
        user.editando = true;
    }

    submitForm(user: any) {
        user?.roles.forEach((rol: any) => {
            user.rol = rol.id;
          });
        this.userService.update(user).subscribe((user: any) => {});
        this.editando = false;
        user.editando = false;
    }

    deleteRow(user: any) {
        user.active = false;
        this.userService.update(user).subscribe((user: any) => {});
        this.getRows();
    }

    cancelEdit(user: any) {
        this.editando = false;
        Object.assign(user, this.backupData);
        this.backupData = null;
        user.editando = false;
    }
}