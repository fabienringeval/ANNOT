import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogDeleteCampaign, DeleteCampaignButtonComponent } from './delete-campaign-button.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromDeletingCampaign from './store';


@NgModule({
  entryComponents: [
    DialogDeleteCampaign
  ],
  declarations: [
    DeleteCampaignButtonComponent,
    DialogDeleteCampaign
  ],
  exports: [
    DeleteCampaignButtonComponent
  ],
  imports: [
    SharedModule,
    MatDialogModule,
    StoreModule.forFeature(fromDeletingCampaign.featureName, fromDeletingCampaign.reducer),
    EffectsModule.forFeature([fromDeletingCampaign.DeleteCampaignEffects])
  ]
})
export class DeleteCampaignButtonModule { }
