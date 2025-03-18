import { NgModule } from '@angular/core';
import { CampaignSheetComponent } from './campaign-sheet.component';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromLoadCampaignList from './store'
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [CampaignSheetComponent],
  exports: [CampaignSheetComponent],
  imports: [
    SharedModule,
    MatTableModule,
    MatCardModule,
    MatListModule,
    StoreModule.forFeature(fromLoadCampaignList.featureName, fromLoadCampaignList.reducer),
    EffectsModule.forFeature([fromLoadCampaignList.LoadCampaignEffects])
  ]
})

export class CampaignSheetModule { }
