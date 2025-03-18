import { NgModule } from '@angular/core';
import { AudioAnnotationComponent } from './audio-annotation.component';
import { SharedModule } from '../../shared.module';
import { EmotionAnnotatorModule } from 'src/app/shared/components/emotion-annotator/emotion-annotator.module';
import { AudioProfilesModule } from '../audio-profiles/audio-profiles.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAudioProfiles from './store';

@NgModule({
  declarations: [AudioAnnotationComponent],
  exports: [AudioAnnotationComponent],
  imports: [
    SharedModule,
    EmotionAnnotatorModule,
    AudioProfilesModule,
    StoreModule.forFeature(fromAudioProfiles.featureName, fromAudioProfiles.reducer),
    EffectsModule.forFeature([fromAudioProfiles.AudioAnnotationEffects])
  ]
})
export class AudioAnnotationModule { }
