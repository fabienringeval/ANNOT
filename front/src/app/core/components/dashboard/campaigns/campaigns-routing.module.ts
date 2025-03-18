import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampaignsHomepageComponent } from './campaigns-homepage/campaigns-homepage.component';
import { CampaignsCreateComponent} from './campaigns-create/campaigns-create.component';
import { CampaignsAnnotationComponent } from './campaigns-annotation/campaigns-annotation.component';

const routes: Routes = [
  { path: 'create', component: CampaignsCreateComponent },
  { path: 'sheets', loadChildren: () => import('./campaigns-sheet/campaigns-sheet.module').then(m => m.CampaignsSheetModule)},
  { path: ':id', component: CampaignsAnnotationComponent },
  { path: '', component: CampaignsHomepageComponent} ,
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignsRoutingModule { }
