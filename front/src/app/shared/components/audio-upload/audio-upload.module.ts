import { NgModule } from '@angular/core';
import { AudioUploadComponent } from './audio-upload.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { SharedModule } from 'src/app/shared/shared.module';
import * as fromAudioUpload from './store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [AudioUploadComponent],
  exports : [AudioUploadComponent],
  imports: [
    SharedModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    StoreModule.forFeature(fromAudioUpload.featureName, fromAudioUpload.reducer),
    EffectsModule.forFeature([fromAudioUpload.AudioUploadEffects])
  ]
})
export class AudioUploadModule { }
