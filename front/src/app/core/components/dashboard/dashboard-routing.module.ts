import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path : '',
    component: DashboardComponent,
    children: [
      { path: 'campaigns', loadChildren: () => import('./campaigns/campaigns.module').then(m => m.CampaignsModule)},
      { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule)},
      { path: 'help', loadChildren: () => import('./help/help.module').then(m => m.HelpModule)},
      { path: 'home', loadChildren: () => import('./campaigns/campaigns.module').then(m => m.CampaignsModule)},
      { path: 'profil', loadChildren: () => import('./profil/profil.module').then(m => m.ProfilModule)},
      { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)},
      { path: '', redirectTo: 'home'},
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
