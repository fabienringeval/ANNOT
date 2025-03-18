import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableCampaignsComponent } from './table-campaigns.component';

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';

import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromLoadCampaignList from './store'
import { DeleteCampaignButtonModule } from '../../delete-button/delete-campaign-button/delete-campaign-button.module';


@NgModule({
  declarations: [TableCampaignsComponent],
  exports: [TableCampaignsComponent],
  imports: [
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    DeleteCampaignButtonModule,
    StoreModule.forFeature(fromLoadCampaignList.featureName, fromLoadCampaignList.reducer),
    EffectsModule.forFeature([fromLoadCampaignList.LoadCampaignListEffects])
  ]
})
export class TableCampaignsModule { }
