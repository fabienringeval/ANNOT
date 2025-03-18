import { NgModule } from '@angular/core';
import { TableEmotionsComponent } from './table-emotions.component';
import { LoadingModule } from 'src/app/shared/components/loading/loading.module';
import { PaginatorModule } from 'src/app/shared/components/paginator/paginator.module';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromLoadEmotionList from './store';
import { DeleteEmotionButtonModule } from 'src/app/shared/components/delete-button/delete-emotion-button/delete-emotion-button.module';

@NgModule({
  declarations: [TableEmotionsComponent],
  exports: [TableEmotionsComponent],
  imports: [
    SharedModule,
    MatTableModule,
    LoadingModule,
    PaginatorModule,
    DeleteEmotionButtonModule,
    StoreModule.forFeature(fromLoadEmotionList.featureName, fromLoadEmotionList.reducer),
    EffectsModule.forFeature([fromLoadEmotionList.LoadEmotionListEffects])
  ]
})
export class TableEmotionsModule { }
