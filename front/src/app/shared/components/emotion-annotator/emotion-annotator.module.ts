import { NgModule } from '@angular/core';
import { EmotionAnnotatorComponent, DialogValidAnnotation } from './emotion-annotator.component';
import { SharedModule } from '../../shared.module';
import { SliderModule } from '../slider/slider.module';
import { AudioPlayerModule } from '../audio-player/audio-player.module';
import { EmotionGraphModule } from '../emotion-graph/emotion-graph.module';
import { MatDialogModule } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromEmotionAnnotator from './store';


@NgModule({
  declarations: [EmotionAnnotatorComponent, DialogValidAnnotation],
  exports: [EmotionAnnotatorComponent],
  imports: [
    SharedModule,
    MatDialogModule,
    SliderModule,
    AudioPlayerModule,
    EmotionGraphModule,
    StoreModule.forFeature(fromEmotionAnnotator.featureName, fromEmotionAnnotator.reducer),
    EffectsModule.forFeature([fromEmotionAnnotator.EmotionAnnotatorEffects])
  ],
  entryComponents: [DialogValidAnnotation]
})
export class EmotionAnnotatorModule { }
