import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from 'src/app/_models/user';

import { UserService } from 'src/app/_services/user.service';
import { RolService } from 'src/app/_services/rol.service';
import { TeamService } from 'src/app/_services/team.service';

import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({   
    selector: 'app-admin-user-inactive',
    templateUrl: 'admin-users-inactive.component.html' 
})

export class AdminUsersInactiveComponent implements OnInit {
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

    getRows(){
        this.loading = true;
        this.userService.getInactive().pipe(first()).subscribe(users => {
            users.forEach((user) => { user.editando = false});
            this.users = users;
        });
        this.loading = false;
    }

    reactivateUser(user: any) {
        user.active = 1;
        this.userService.update(user).subscribe((user: any) => {});
        this.getRows();
    }
}