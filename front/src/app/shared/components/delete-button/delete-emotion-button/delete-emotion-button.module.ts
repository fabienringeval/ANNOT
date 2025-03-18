import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogDeleteEmotion, DeleteEmotionButtonComponent } from './delete-emotion-button.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromDeletingEmotion from './store';


@NgModule({
  entryComponents: [
    DialogDeleteEmotion
  ],
  declarations: [
    DeleteEmotionButtonComponent,
    DialogDeleteEmotion
  ],
  exports: [
    DeleteEmotionButtonComponent
  ],
  imports: [
    SharedModule,
    MatDialogModule,
    StoreModule.forFeature(fromDeletingEmotion.featureName, fromDeletingEmotion.reducer),
    EffectsModule.forFeature([fromDeletingEmotion.DeleteEmotionEffects])
  ]
})
export class DeleteEmotionButtonModule { }
