import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableAudiosComponent } from './table-audios.component';
import { LoadingModule } from 'src/app/shared/components/loading/loading.module';
import { PaginatorModule } from 'src/app/shared/components/paginator/paginator.module';
import {MatTableModule} from '@angular/material/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromLoadAudioList from './store'
import { DeleteAudioButtonModule } from '../../delete-button/delete-audio-button/delete-audio-button.module';
import { UploadAudioButtonModule } from '../../upload-audio-button/upload-audio-button.module';


@NgModule({
  declarations: [TableAudiosComponent],
  exports: [TableAudiosComponent],
  imports: [
    SharedModule,
    MatTableModule,
    LoadingModule,
    PaginatorModule,
    DeleteAudioButtonModule,
    UploadAudioButtonModule,
    StoreModule.forFeature(fromLoadAudioList.featureName, fromLoadAudioList.reducer),
    EffectsModule.forFeature([fromLoadAudioList.LoadAudioListEffects])
  ]
})
export class TableAudiosModule { }
