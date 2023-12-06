import { Component } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
import { User } from './_models/user';
import { UserService } from './_services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading = false;
  user?: User | null;
  userFromApi?: User;

  constructor(        
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
      this.authenticationService.user.subscribe(x => this.user = x);
  }

  ngOnInit() {
    this.loading = true;
    if(this.user?.id != null){
        this.userService.getById(this.user?.id).pipe(first()).subscribe(user => {
            this.loading = false;
        });
    }
  }
  
  get isGestor(): boolean {
    return this.user?.roles.some(rol => rol.name === 'gestor') || false;
  }

  get isAdmin(): boolean {
    return this.user?.roles.some(rol => rol.name === 'admin') || false;
  }

  logout() {
      this.authenticationService.logout();
  }
}