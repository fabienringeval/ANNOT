import { NgModule } from '@angular/core';
import { EmotionCreateComponent } from './emotion-create.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';
import * as fromCreateEmotion from './store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [EmotionCreateComponent],
  exports : [EmotionCreateComponent],
    imports: [
        SharedModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        StoreModule.forFeature(fromCreateEmotion.featureName, fromCreateEmotion.reducer),
        EffectsModule.forFeature([fromCreateEmotion.CreateEmotionEffects]),
        MatIconModule
    ]
})
export class EmotionCreateModule { }
