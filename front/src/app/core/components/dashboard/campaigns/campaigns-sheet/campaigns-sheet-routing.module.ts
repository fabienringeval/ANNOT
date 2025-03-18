import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampaignsSheetComponent } from './campaigns-sheet.component';
import { CampaignsSheetInformationComponent } from './campaigns-sheet-information/campaigns-sheet-information.component';
import { CampaignsSheetFilesComponent} from './campaigns-sheet-files/campaigns-sheet-files.component';
import { CampaignsSheetUsersComponent } from './campaigns-sheet-users/campaigns-sheet-users.component';
import { CampaignsSheetExportComponent } from './campaigns-sheet-export/campaigns-sheet-export.component';
import { CampaignsSheetCloseComponent } from './campaigns-sheet-close/campaigns-sheet-close.component';
import { CampaignsSheetDeleteComponent } from './campaigns-sheet-delete/campaigns-sheet-delete.component';

const routes: Routes = [
  {
    path : ':id',
    component: CampaignsSheetComponent,
    children: [
      { path: 'information', component: CampaignsSheetInformationComponent },
      { path: 'files', component: CampaignsSheetFilesComponent },
      { path: 'users', component: CampaignsSheetUsersComponent },
      { path: 'export', component: CampaignsSheetExportComponent },
      { path: 'activity', component: CampaignsSheetCloseComponent },
      { path: 'delete', component: CampaignsSheetDeleteComponent },
      { path: '', redirectTo: 'information' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CampaignsSheetRoutingModule { }
