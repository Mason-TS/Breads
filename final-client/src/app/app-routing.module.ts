import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NewComponent } from './components/new/new.component';
import { EditComponent } from './components/edit/edit.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';

const routes: Routes = [
  {path: "", redirectTo: "/home", pathMatch: "full"},
  {path: "home", component: HomeComponent},
  {path: "signin", component: SignInComponent},
  {path: "signup", component: SignUpComponent},
  {path: "profile/:id", component: ProfileComponent},
  {path: "new", component: NewComponent},
  {path: "edit/:id", component: EditComponent},
  {path: "profile-edit", component: ProfileEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
