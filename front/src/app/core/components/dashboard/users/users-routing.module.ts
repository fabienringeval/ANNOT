import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserHomepageComponent } from './user-homepage/user-homepage.component';


const routes: Routes = [
  { path: '', component: UserHomepageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
