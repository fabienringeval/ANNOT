import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogUploadAudio, UploadAudioButtonComponent } from './upload-audio-button.component';
import { AudioUploadModule } from '../audio-upload/audio-upload.module';


@NgModule({
  entryComponents: [
    DialogUploadAudio
  ],
  declarations: [
    UploadAudioButtonComponent,
    DialogUploadAudio
  ],
  exports: [
    UploadAudioButtonComponent
  ],
  imports: [
    SharedModule,
    MatDialogModule,
    AudioUploadModule
  ]
})
export class UploadAudioButtonModule { }
