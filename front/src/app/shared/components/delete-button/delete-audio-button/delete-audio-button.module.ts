import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogDeleteAudio, DeleteAudioButtonComponent } from './delete-audio-button.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromDeletingAudio from './store';


@NgModule({
  entryComponents: [
    DialogDeleteAudio
  ],
  declarations: [
    DeleteAudioButtonComponent,
    DialogDeleteAudio
  ],
  exports: [
    DeleteAudioButtonComponent
  ],
  imports: [
    SharedModule,
    MatDialogModule,
    StoreModule.forFeature(fromDeletingAudio.featureName, fromDeletingAudio.reducer),
    EffectsModule.forFeature([fromDeletingAudio.DeleteAudioEffects])
  ]
})
export class DeleteAudioButtonModule { }
