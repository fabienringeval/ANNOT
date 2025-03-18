import { NgModule } from '@angular/core';
import { AudioListComponent } from './audio-list.component';
import { SharedModule } from '../../shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAudioList from './store';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { PaginatorModule } from '../paginator/paginator.module';

@NgModule({
  declarations: [AudioListComponent],
  exports: [AudioListComponent],
  imports: [
    SharedModule,
    MatIconModule,
    MatListModule,
    PaginatorModule,
    StoreModule.forFeature(fromAudioList.featureName, fromAudioList.reducer),
    EffectsModule.forFeature([fromAudioList.AudioListEffects])
  ]
})
export class AudioListModule { }
