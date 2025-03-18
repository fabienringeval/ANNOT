import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogDeleteProfile, DeleteProfileButtonComponent } from './delete-profile-button.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromDeletingProfile from './store';


@NgModule({
  entryComponents: [
    DialogDeleteProfile
  ],
  declarations: [
    DeleteProfileButtonComponent,
    DialogDeleteProfile
  ],
  exports: [
    DeleteProfileButtonComponent
  ],
  imports: [
    SharedModule,
    MatDialogModule,
    StoreModule.forFeature(fromDeletingProfile.featureName, fromDeletingProfile.reducer),
    EffectsModule.forFeature([fromDeletingProfile.DeleteProfileEffects])
  ]
})
export class DeleteProfileButtonModule { }
