import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [

  {
    path: 'login',
    canActivate: [AuthGuard],
    loadChildren: () => import('./core/components/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'annot',
    canActivate: [AuthGuard],
    loadChildren: () => import('./core/components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  { path: '**', redirectTo: 'annot' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
