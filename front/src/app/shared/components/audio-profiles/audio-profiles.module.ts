import { NgModule } from '@angular/core';
import {AudioProfilesComponent, DialogSliderCategory, RandomOrderPipe} from './audio-profiles.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import * as fromAudioProfiles from './store';
import { MatDividerModule } from '@angular/material/divider';
import { SimpleplayerModule } from 'src/app/shared/components/simpleplayer/simpleplayer.module';
import {MatSliderModule} from '@angular/material/slider';
import {SliderModule} from '../slider/slider.module';
import {MatGridListModule} from '@angular/material/grid-list';
import {LongPressDirective} from '../../directives/longpress.directive';
import * as fromEmotionAnnotator from '../emotion-annotator/store';
import {EmotionAnnotatorModule} from '../emotion-annotator/emotion-annotator.module';

@NgModule({
    declarations: [AudioProfilesComponent, DialogSliderCategory, RandomOrderPipe, LongPressDirective, LongPressDirective],
    exports: [AudioProfilesComponent],
    imports: [
        SharedModule,
        MatButtonToggleModule,
        MatDividerModule,
        SimpleplayerModule,
        StoreModule.forFeature(fromAudioProfiles.featureName, fromAudioProfiles.reducer),
        EffectsModule.forFeature([fromAudioProfiles.AudioProfilesEffects]),
        MatSliderModule,
        SliderModule,
        MatGridListModule,

    ],
    entryComponents: [DialogSliderCategory]
})
export class AudioProfilesModule { }
