import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./security/login/login.component";
import {RegisterWithGoogleComponent} from "./security/register-with-google/register-with-google.component";


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'registerWithGoogle/:email', component: RegisterWithGoogleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
