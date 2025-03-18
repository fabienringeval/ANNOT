import { NgModule } from '@angular/core';

// routing
import { CampaignsSheetRoutingModule } from './campaigns-sheet-routing.module';

// modules
import { CampaignSheetModule } from 'src/app/shared/components/sheets/campaign-sheet/campaign-sheet.module';
import { SharedModule } from 'src/app/shared/shared.module';

// components
import { CampaignsSheetComponent } from './campaigns-sheet.component';
import { CampaignsSheetInformationComponent } from './campaigns-sheet-information/campaigns-sheet-information.component';
import { CampaignsSheetFilesComponent } from './campaigns-sheet-files/campaigns-sheet-files.component';
import { CampaignsSheetUsersComponent } from './campaigns-sheet-users/campaigns-sheet-users.component';
import { CampaignsSheetExportComponent } from './campaigns-sheet-export/campaigns-sheet-export.component';
import { CampaignsSheetCloseComponent } from './campaigns-sheet-close/campaigns-sheet-close.component';
import { CampaignsSheetDeleteComponent } from './campaigns-sheet-delete/campaigns-sheet-delete.component';

import { TableAudiosModule } from 'src/app/shared/components/table/table-audios/table-audios.module';

import { LoadingModule } from 'src/app/shared/components/loading/loading.module';
import { ButtonModule } from 'src/app/shared/components/button/button.module';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { TableCampaignUsersModule } from 'src/app/shared/components/table/table-campaign-users/table-campaign-users.module';
import { ExportCampaignModule } from 'src/app/shared/components/export-campaign/export-campaign.module';
import { DeleteCampaignButtonModule } from 'src/app/shared/components/delete-button/delete-campaign-button/delete-campaign-button.module';


@NgModule({
  declarations: [
    CampaignsSheetComponent,
    CampaignsSheetInformationComponent,
    CampaignsSheetFilesComponent,
    CampaignsSheetUsersComponent,
    CampaignsSheetExportComponent,
    CampaignsSheetCloseComponent,
    CampaignsSheetDeleteComponent
  ],
  imports: [
    SharedModule,
    CampaignsSheetRoutingModule,
    TableCampaignUsersModule,
    TableAudiosModule,
    LoadingModule,
    ButtonModule,
    CampaignSheetModule,
    MatButtonModule,
    MatDialogModule,
    ExportCampaignModule,
    DeleteCampaignButtonModule
  ]
})

export class CampaignsSheetModule { }
