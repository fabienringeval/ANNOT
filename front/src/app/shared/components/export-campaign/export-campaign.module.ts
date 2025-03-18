import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportCampaignComponent } from './export-campaign.component';
import { LoadingModule } from 'src/app/shared/components/loading/loading.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromExportCampaign from './store';
import { ButtonModule } from '../button/button.module';


@NgModule({
  declarations: [ExportCampaignComponent],
  exports : [ExportCampaignComponent],
  imports: [
    CommonModule,
    LoadingModule,
    ButtonModule,
    StoreModule.forFeature(fromExportCampaign.featureName, fromExportCampaign.reducer),
    EffectsModule.forFeature([fromExportCampaign.ExportCampaignEffects])
  ]
})
export class ExportCampaignModule { }
