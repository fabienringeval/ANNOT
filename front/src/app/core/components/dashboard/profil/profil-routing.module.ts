import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilHomepageComponent } from './profil-homepage/profil-homepage.component';
import { from } from 'rxjs';


const routes: Routes = [
  { path: '', component: ProfilHomepageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilRoutingModule { }
