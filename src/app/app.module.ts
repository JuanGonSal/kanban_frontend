import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
/* import { fakeBackendProvider } from './_helpers/fake-backend'; */

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { KanbanModule } from './kanban/kanban.module';
import { RegisterComponent } from './registrer/register.component';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    KanbanModule,
    AdminModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

      // provider used to create fake backend
/*       fakeBackendProvider */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
